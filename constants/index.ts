export const headerLinks = [
    {
      label: 'Home',
      route: '/',
    },
    {
      label: 'Host Quiz',
      route: '/hostquiz/questions',
    },
    {
      label: 'Attempt Quiz',
      route: '/attemptquiz',
    },
    // {
    //   label: 'My Profile',
    //   route: '/profile',
    // },
  ]
  
  export const eventDefaultValues = {
    title: '',
    description: '',
    location: '',
    imageUrl: '',
    startDateTime: new Date(),
    endDateTime: new Date(),
    categoryId: '',
    price: '',
    isFree: false,
    url: '',
  }