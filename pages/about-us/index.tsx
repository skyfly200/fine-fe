import React, { useEffect, useMemo, useRef, useState } from 'react'
import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import groq from 'groq'
import cn from 'classnames'

import Layout from '../../containers/Layout'
import Icon from '../../components/Icon'
import Link from '../../components/Link'
import TextInput from '../../components/TextInput'
import client from '../../client'
import { Artist, FAQ } from '../../types'
import Accordion from '../../components/Accordion'
import BlockContent from '@sanity/block-content-to-react'

import s from './AboutUs.module.scss'
import sc from '../../styles/components.module.scss'
import { useDebounce } from '@usedapp/core'
import Logo from '../../components/Logo'
import FixedSidenav from '../../components/FixedSidenav'

interface AboutUsProps {
  curators: Artist[]
  faqs: FAQ[]
}

const menu = ['About', 'curators', 'FAQ']
const itemsPerPage = 5

const AboutUs: NextPage<AboutUsProps> = ({ curators, faqs }) => {
  const [activeSection, setActiveSection] = useState(menu[0])
  const [activePage, setActivePage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchValue, setSearchValue] = useState<string>('')
  const debouncedValue = useDebounce<string>(searchValue, 500)

  // Intersection Navigation
  const aboutRef = useRef(null)
  const curatorRef = useRef(null)
  const faqRef = useRef(null)

  const handleIntersect = (entries: IntersectionObserverEntry[]) => {
    if (entries[0].isIntersecting) {
      setActiveSection(entries[0].target.id)
    }
  }

  const createObserver = (target: Element) => {
    const observer = new IntersectionObserver(handleIntersect, { threshold: 0.5 })
    observer.observe(target)
  }

  useEffect(() => {
    aboutRef.current && createObserver(aboutRef.current)
    curatorRef.current && createObserver(curatorRef.current)
    faqRef.current && createObserver(faqRef.current)
  }, [])

  // Pagination
  useEffect(() => {
    setTotalPages(Math.ceil(curators.length / itemsPerPage))
  }, [curators])

  const handleNext = () => {
    if (activePage < totalPages) setActivePage(s => s + 1)
  }

  const handlePrev = () => {
    if (activePage > 1) setActivePage(s => s - 1)
  }

  const filteredCurators = useMemo(() => {
    let items = [...curators].filter(curator =>
      curator.name?.toLowerCase().includes(debouncedValue.toLowerCase())
    )
    setTotalPages(Math.ceil(items.length / itemsPerPage))

    const firstItem = itemsPerPage * (activePage - 1)
    const lastItem = firstItem + itemsPerPage
    return items.slice(firstItem, lastItem)
  }, [curators, activePage, debouncedValue])

  return (
    <Layout hideLogo greyBG>
      <div className={s.pageWrapper}>
        <Logo big />
        <FixedSidenav menu={menu} active={activeSection} />
        <div className={s.body}>
          <section id={menu[0]} className={s.about} ref={aboutRef}>
            <div>
              <p className={s.bodyXL}>
                FINE Digital is a cross-functional lab dedicated to guide artists and creatives in
                their exploration of working in the metasphere.
              </p>
              <p className={s.bodyXL}>
                We help extraordinary cultural creators & companies push the boundaries of our new
                digital environment by removing barriers caused by technology, crypto-culture and
                unchartered workflows
              </p>
            </div>
          </section>

          <section className={s.curators} id={menu[1]} ref={curatorRef}>
            <div className={s.sectionHeader}>
              <h3 className={sc.h3}>Fine Curators</h3>
              <TextInput
                styleType="search"
                placeholder="Search by name..."
                onChange={e => setSearchValue(e.target.value)}
                value={searchValue}
              />
            </div>
            <div>
              <ul className={s.curatorsList}>
                {filteredCurators.map(curator => (
                  <li key={curator._id} className={s.curatorCard}>
                    {curator.name}
                  </li>
                ))}
              </ul>
              {totalPages > 1 && (
                <div className={s.pagination}>
                  <button
                    className={s.paginationBtn}
                    onClick={handlePrev}
                    disabled={activePage === 1}
                  >
                    <Icon icon="chevron-left" />
                  </button>
                  <span>{activePage}</span>/<span>{totalPages}</span>
                  <button
                    className={s.paginationBtn}
                    onClick={handleNext}
                    disabled={activePage === totalPages}
                  >
                    <Icon icon="chevron-right" />
                  </button>
                </div>
              )}
            </div>
          </section>
          <section className={s.faqs} id={menu[2]} ref={faqRef}>
            <div className={s.sectionHeader}>
              <h3 className={sc.h3}>Frequent Asked Questions</h3>
            </div>
            <ul className={s.faqsList}>
              {faqs?.map(el => (
                <Accordion
                  key={el._key}
                  className={s.accordion}
                  header={<h2 className={s.question}>{el.question}</h2>}
                >
                  <div className={s.answerWrapper}>
                    <div className="sanity-body">
                      <BlockContent
                        blocks={el.answer}
                        imageOptions={{ w: 680, fit: 'max' }}
                        {...client.config()}
                      />
                    </div>
                  </div>
                </Accordion>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </Layout>
  )
}
export const getStaticProps: GetStaticProps = async context => {
  const curators = await client.fetch(groq`  *[_type == "curator"]`)
  const faqs = await client.fetch(groq`  *[_type == "faqs"][0]`)

  return {
    props: {
      curators,
      faqs: faqs?.faqs
    },
    revalidate: 10
  }
}
export default AboutUs
