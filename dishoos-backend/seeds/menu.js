
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('reviews').del().then(() => { return knex('dish').del()
    .then(() => {
      return knex('restaurant').del().then(() => {
        return knex('restaurant').insert([{
          id: 0,
          name: 'NANDOS',
        },
        {
          id: 1,
          name: 'DOZO',
        },
        {
          id: 2,
          name: 'ROCCA',

        },
        {
          id: 3,
          name: 'WILDWOODS',
        },
        {
          id: 4,
          name: 'KFC',
        },
        {
          id: 5,
          name: 'ZIZZI',

        },]).then(() => {
          // Inserts seed entries
          return knex('dish').insert([{
            name: 'chicken thighs',
            description: 'Really nice chicken thighs.',
            imageUrl: 'https://media-cdn.tripadvisor.com/media/photo-s/09/a2/9f/50/nando-s.jpg',
            price: 10.25,
            restaurantId: 0,
            type: 'MAIN',
            tags: '',
          },
          {
            name: 'sunset burger',
            description: 'A super nice burger with some real good sauce.',
            imageUrl: 'https://metrouk2.files.wordpress.com/2016/10/sunset-burger.jpg?w=748&h=550&crop=1',
            price: 11.00,
            restaurantId: 0,
            type: 'MAIN',
            tags: '',
          },
          {
            name: 'chicken breast',
            description: 'Some chicken breast which is very tasty.',
            imageUrl: 'https://media-cdn.tripadvisor.com/media/photo-s/05/5c/b1/d0/nando-s.jpg',
            price: 10.50,
            restaurantId: 0,
            type: 'MAIN',
            tags: '',
          },
          {
            name: 'Sweet potato wrap',
            description: 'sweet potato and butternut wrap.',
            imageUrl: 'http://www.veganfoodandliving.com/wp-content/uploads/2017/10/Screen-Shot-2017-10-17-at-09.29.48-1024x571.png',
            price: 6.45,
            restaurantId: 0,
            type: 'MAIN',
            tags: 'Vegetarian',
          },
          {
            name: 'chocolot cake',
            description: 'great chocolate cake',
            imageUrl: 'https://media-cdn.tripadvisor.com/media/photo-s/06/a0/31/d0/nando-s.jpg',
            price: 6.50,
            restaurantId: 0,
            type: 'DESSERT',
            tags: 'Vegetarian',
          },
          {
            name: 'frozen yoghurt',
            description: 'unlimited frozen yoghurt',
            imageUrl: 'https://media-cdn.tripadvisor.com/media/photo-s/07/44/8f/48/nando-s.jpg',
            price: 6.50,
            restaurantId: 0,
            type: 'DESSERT',
            tags: 'Vegetarian',
          },

          {
            name: 'linguini',
            description: 'Pasta with basil pesto',
            imageUrl: 'https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/recipe-image-legacy-id--1845_10.jpg?itok=GvW3gBBJ',
            price: 7.45,
            restaurantId: 2,
            type: 'MAIN',
            tags: 'Vegetarian',
          },
          {
            name: 'carbonara',
            description: 'spicy corn spaghetti pasta dish',
            imageUrl: 'https://purewow-prodstatics3azcdn.azureedge.net/images/articles/2017_08/corn-carbonara-fb.jpg',
            price: 8.40,
            restaurantId: 2,
            type: 'MAIN',
            tags: '',
          },
          {
            name: 'pescatora',
            description: 'prawns, mussels & clams, chilli, tomato & white wine sauce',
            imageUrl: 'https://www.noidiroma.com/wp-content/uploads/2014/03/ricetta-spaghetti-pescatora.jpg',
            price: 9.70,
            restaurantId: 2,
            type: 'MAIN',
            tags: '',
          },
          {
            name: 'rigatoni',
            description: 'pasta with classic italian cheeses & celery',
            imageUrl: 'https://imagesvc.timeincapp.com/v3/mm/image?url=http%3A%2F%2Fimg1.cookinglight.timeinc.net%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fmedium_2x%2Fpublic%2Fimage%2F2017%2F06%2Fmain%2Frigatoni-kale-pesto-1708p12.jpg%3Fitok%3DZRmUV5oK&w=700&q=85',
            price: 6.85,
            restaurantId: 2,
            type: 'MAIN',
            tags: 'Vegetarian',
          },
          {
            name: 'fegatini',
            description: 'pan-fried chicken livers, shallots, red wine, potatoes, spinach leaves',
            imageUrl: 'http://cdn.cook.stbm.it/thumbnails/ricette/1/1662/hd750x421.jpg',
            price: 8.95,
            restaurantId: 2,
            type: 'MAIN',
            tags: '',
          },
          {
            name: 'Pollo',
            description: 'chicken, roasted tomatoes & beetroot, onions, peppers, sultanas',
            imageUrl: 'http://images.media-allrecipes.com/userphotos/960x960/3757608.jpg',
            price: 9.65,
            restaurantId: 2,
            type: 'MAIN',
            tags: '',
          },
          {
            name: 'nicoise',
            description: 'white bonito tuna, free-range egg, anchovies, french beans',
            imageUrl: 'https://www.bbcgoodfood.com/sites/default/files/recipe_images/recipe-image-legacy-id--19038_11.jpg',
            price: 10.25,
            restaurantId: 2,
            type: 'MAIN',
            tags: '',
          },
          {
            name: 'Tiramisu',
            description: 'Coffee flavoured cake',
            imageUrl: 'https://images.food52.com/99NMfG34doJavR5y-DdJethifdM=/753x502/22ae29ea-d52f-4043-93a6-42eb68958b9d--IMG_4173_copy_web.jpg',
            price: 4.50,
            restaurantId: 2,
            type: 'DESSERT',
            tags: 'Vegetarian',
          },
          {
            name: 'Tartufo',
            description: 'Classic ice cream dessert',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/81/Tartufo-artigianale-pizzo.jpg',
            price: 5.50,
            restaurantId: 2,
            type: 'DESSERT',
            tags: 'Vegetarian',
          },
          {
            name: 'Affogato',
            description: 'ice cream in espresso',
            imageUrl: 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2011/10/5/1/FNM_110111-WN-Desserts-004_s4x3.jpg.rend.hgtvcom.616.462.suffix/1371600520701.jpeg',
            price: 2.50,
            restaurantId: 2,
            type: 'DESSERT',
            tags: 'Vegetarian',
          },
          ]);
        });
      });
    });
  });
};
