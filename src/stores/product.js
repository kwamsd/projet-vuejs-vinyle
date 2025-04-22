import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProductsStore = defineStore('products', () => {
  const products = ref([
    {
      id: 1,
      title: "Certified Lover Boy",
      artist: "Drake",
      price: 25.99,
      image: "/assets/image/albums/certified_lover_boy.jpg"
    },
    {
      id: 2,
      title: "Her Loss",
      artist: "Drake",
      price: 29.99,
      image: "/assets/image/albums/her_loss.jpg"
    },
    {
      id: 3,
      title: "Port of Miami 2",
      artist: "Rick Ross",
      price: 34.99,
      image: "/assets/image/albums/port_of_miami_2.jpeg"
    },
    {
      id: 4,
      title: "Rather You Than Me",
      artist: "Rick Ross",
      price: 29.99,
      image: "/assets/image/albums/rather_you_than_me.png"
    },
    {
      id: 5,
      title: "African Giant",
      artist: "Burna Boy",
      price: 34.99,
      image: "/assets/image/albums/african_giant.png"
    },
    {
      id: 6,
      title: "Love, Damini",
      artist: "Burna Boy",
      price: 14.99,
      image: "/assets/image/albums/love_damini.jpeg"
    }
  ])

  return { products }
})
