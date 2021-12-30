import { Event } from '../types'

const events: Event[] = [
  {
    id: '1',
    date: 'Tue Nov 23 2021 13:24:54 GMT+0000 (Western European Standard Time)',
    title: 'How Do We DAO? The Party by Odd Name',
    subtitle:
      'Aliquam eget leo sapien. Suspendisse maximus neque ullamcorper elit commodo accumsan. Sed eget egestas quam. Phasellus id risus scelerisque, iaculis neque quis, aliquam nisi. Morbi consequat tincidunt ante eget vulputate. Sed faucibus euismod odio et vestibulum. ',
    images: [
      {
        src: 'https://res.cloudinary.com/dhrwv7wvb/image/upload/v1640787269/fine/event-1_xihxng.jpg',
        alt: 'event image'
      },
      {
        src: 'https://res.cloudinary.com/dhrwv7wvb/image/upload/v1640787269/fine/event-1_xihxng.jpg',
        alt: 'event image'
      }
    ],
    body: [
      'Praesent eu nibh a dui rutrum imperdiet eget ut tortor. Cras iaculis vehicula fringilla. Donec vestibulum est et nulla accumsan, quis semper metus ullamcorper. Praesent sagittis lorem libero, ac porta nisl tristique sed. Quisque laoreet nec mi eget hendrerit. Nulla sed iaculis est, eu rutrum tortor. Nulla a suscipit eros.',
      'Sed sollicitudin quam eu dolor fringilla, vel aliquet quam laoreet. Aliquam condimentum, ante et convallis ultrices, enim ante semper felis, eu viverra velit arcu vitae ante. Phasellus id gravida felis, in condimentum dui. Phasellus vel dolor lacus. Etiam sit amet elit ante. Donec ut nibh sodales, tempor velit quis, egestas justo. Suspendisse commodo risus enim, vel hendrerit sem tincidunt id. Nam ultricies sodales massa in sodales. Sed laoreet rutrum nunc eu cursus. Sed mattis ipsum in justo pellentesque vehicula. Integer mattis finibus elit nec venenatis. Donec dictum neque bibendum nisl sagittis pellentesque. Aliquam et mollis urna, sit amet ultricies est. Suspendisse consectetur erat vitae nibh lobortis sodales. Morbi suscipit ut erat at ullamcorper.',
      'Praesent eu nibh a dui rutrum imperdiet eget ut tortor. Cras iaculis vehicula fringilla. Donec vestibulum est et nulla accumsan, quis semper metus ullamcorper. Praesent sagittis lorem libero, ac porta nisl tristique sed. Quisque laoreet nec mi eget hendrerit. Nulla sed iaculis est, eu rutrum tortor. Nulla a suscipit eros.',
      'Praesent eu nibh a dui rutrum imperdiet eget ut tortor. Cras iaculis vehicula fringilla. Donec vestibulum est et nulla accumsan, quis semper metus ullamcorper. Praesent sagittis lorem libero, ac porta nisl tristique sed. Quisque laoreet nec mi eget hendrerit. Nulla sed iaculis est, eu rutrum tortor. Nulla a suscipit eros.',
      'Sed sollicitudin quam eu dolor fringilla, vel aliquet quam laoreet. Aliquam condimentum, ante et convallis ultrices, enim ante semper felis, eu viverra velit arcu vitae ante. Phasellus id gravida felis, in condimentum dui. Phasellus vel dolor lacus. Etiam sit amet elit ante. Donec ut nibh sodales, tempor velit quis, egestas justo. Suspendisse commodo risus enim, vel hendrerit sem tincidunt id. Nam ultricies sodales massa in sodales. Sed laoreet rutrum nunc eu cursus. Sed mattis ipsum in justo pellentesque vehicula. Integer mattis finibus elit nec venenatis. Donec dictum neque bibendum nisl sagittis pellentesque. Aliquam et mollis urna, sit amet ultricies est. Suspendisse consectetur erat vitae nibh lobortis sodales. Morbi suscipit ut erat at ullamcorper.',
      'Praesent eu nibh a dui rutrum imperdiet eget ut tortor. Cras iaculis vehicula fringilla. Donec vestibulum est et nulla accumsan, quis semper metus ullamcorper. Praesent sagittis lorem libero, ac porta nisl tristique sed. Quisque laoreet nec mi eget hendrerit. Nulla sed iaculis est, eu rutrum tortor. Nulla a suscipit eros.',
      'Praesent eu nibh a dui rutrum imperdiet eget ut tortor. Cras iaculis vehicula fringilla. Donec vestibulum est et nulla accumsan, quis semper metus ullamcorper. Praesent sagittis lorem libero, ac porta nisl tristique sed. Quisque laoreet nec mi eget hendrerit. Nulla sed iaculis est, eu rutrum tortor. Nulla a suscipit eros.',
      'Sed sollicitudin quam eu dolor fringilla, vel aliquet quam laoreet. Aliquam condimentum, ante et convallis ultrices, enim ante semper felis, eu viverra velit arcu vitae ante. Phasellus id gravida felis, in condimentum dui. Phasellus vel dolor lacus. Etiam sit amet elit ante. Donec ut nibh sodales, tempor velit quis, egestas justo. Suspendisse commodo risus enim, vel hendrerit sem tincidunt id. Nam ultricies sodales massa in sodales. Sed laoreet rutrum nunc eu cursus. Sed mattis ipsum in justo pellentesque vehicula. Integer mattis finibus elit nec venenatis. Donec dictum neque bibendum nisl sagittis pellentesque. Aliquam et mollis urna, sit amet ultricies est. Suspendisse consectetur erat vitae nibh lobortis sodales. Morbi suscipit ut erat at ullamcorper.',
      'Praesent eu nibh a dui rutrum imperdiet eget ut tortor. Cras iaculis vehicula fringilla. Donec vestibulum est et nulla accumsan, quis semper metus ullamcorper. Praesent sagittis lorem libero, ac porta nisl tristique sed. Quisque laoreet nec mi eget hendrerit. Nulla sed iaculis est, eu rutrum tortor. Nulla a suscipit eros.',
      'Sed sollicitudin quam eu dolor fringilla, vel aliquet quam laoreet. Aliquam condimentum, ante et convallis ultrices, enim ante semper felis, eu viverra velit arcu vitae ante. Phasellus id gravida felis, in condimentum dui. Phasellus vel dolor lacus. Etiam sit amet elit ante. Donec ut nibh sodales, tempor velit quis, egestas justo. Suspendisse commodo risus enim, vel hendrerit sem tincidunt id. Nam ultricies sodales massa in sodales. Sed laoreet rutrum nunc eu cursus. Sed mattis ipsum in justo pellentesque vehicula. Integer mattis finibus elit nec venenatis. Donec dictum neque bibendum nisl sagittis pellentesque. Aliquam et mollis urna, sit amet ultricies est. Suspendisse consectetur erat vitae nibh lobortis sodales. Morbi suscipit ut erat at ullamcorper.',
      'Praesent eu nibh a dui rutrum imperdiet eget ut tortor. Cras iaculis vehicula fringilla. Donec vestibulum est et nulla accumsan, quis semper metus ullamcorper. Praesent sagittis lorem libero, ac porta nisl tristique sed. Quisque laoreet nec mi eget hendrerit. Nulla sed iaculis est, eu rutrum tortor. Nulla a suscipit eros.'
    ],
    dates: [
      {
        title: 'Event - 1',
        detail: 'Tue Nov 23 2022 13:24:54 GMT+0000 (Western European Standard Time)'
      },
      {
        title: 'Event - 2',
        detail: 'Tue Nov 24 2022 13:24:54 GMT+0000 (Western European Standard Time)'
      },
      {
        title: 'Event - 1',
        detail: 'Tue Nov 25 2022 13:24:54 GMT+0000 (Western European Standard Time)'
      }
    ],
    contacts: [
      { title: 'web', detail: 'www.contact.com' },
      { title: 'contact', detail: 'event-contact@yopmail.com' }
    ],
    locations: [
      { title: 'Gallery X', detail: '169 William St, New Bedford, MA 02740, United States' }
    ]
  },
  {
    id: 'event-2',
    date: 'Tue Nov 23 2021 13:24:54 GMT+0000 (Western European Standard Time)',
    title: 'Second event',
    subtitle:
      'Aliquam eget leo sapien. Suspendisse maximus neque ullamcorper elit commodo accumsan. Sed eget egestas quam. Phasellus id risus scelerisque, iaculis neque quis, aliquam nisi. Morbi consequat tincidunt ante eget vulputate. Sed faucibus euismod odio et vestibulum. ',
    images: [
      {
        src: 'https://res.cloudinary.com/dhrwv7wvb/image/upload/v1640787308/fine/FCTj2_5XEAIKjfg_pkornp.jpg',
        alt: 'event image'
      },
      {
        src: 'https://res.cloudinary.com/dhrwv7wvb/image/upload/v1640787269/fine/event-1_xihxng.jpg',
        alt: 'event image'
      }
    ],
    body: [
      'Praesent eu nibh a dui rutrum imperdiet eget ut tortor. Cras iaculis vehicula fringilla. Donec vestibulum est et nulla accumsan, quis semper metus ullamcorper. Praesent sagittis lorem libero, ac porta nisl tristique sed. Quisque laoreet nec mi eget hendrerit. Nulla sed iaculis est, eu rutrum tortor. Nulla a suscipit eros.',
      'Sed sollicitudin quam eu dolor fringilla, vel aliquet quam laoreet. Aliquam condimentum, ante et convallis ultrices, enim ante semper felis, eu viverra velit arcu vitae ante. Phasellus id gravida felis, in condimentum dui. Phasellus vel dolor lacus. Etiam sit amet elit ante. Donec ut nibh sodales, tempor velit quis, egestas justo. Suspendisse commodo risus enim, vel hendrerit sem tincidunt id. Nam ultricies sodales massa in sodales. Sed laoreet rutrum nunc eu cursus. Sed mattis ipsum in justo pellentesque vehicula. Integer mattis finibus elit nec venenatis. Donec dictum neque bibendum nisl sagittis pellentesque. Aliquam et mollis urna, sit amet ultricies est. Suspendisse consectetur erat vitae nibh lobortis sodales. Morbi suscipit ut erat at ullamcorper.'
    ],
    dates: [
      {
        title: 'Event - 1',
        detail: 'Tue Nov 23 2022 13:24:54 GMT+0000 (Western European Standard Time)'
      },
      {
        title: 'Event - 2',
        detail: 'Tue Nov 24 2022 13:24:54 GMT+0000 (Western European Standard Time)'
      },
      {
        title: 'Event - 1',
        detail: 'Tue Nov 25 2022 13:24:54 GMT+0000 (Western European Standard Time)'
      }
    ],
    contacts: [
      { title: 'web', detail: 'www.contact.com' },
      { title: 'contact', detail: 'event-contact@yopmail.com' }
    ]
  }
]

export default events
