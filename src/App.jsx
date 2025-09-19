import React, { useState, useEffect } from "react";
import "./App.css";

const hotels = [
  { id: 1, name: "Babylon Rotana", city: "Baghdad", price: 266, rating: 5, roomsAvailable: 16, services: ["Free WiFi", "Breakfast", "Parking"], image: "https://q-xx.bstatic.com/xdata/images/hotel/max500/338257763.jpg?k=c17d5092bd844360554df7e19d074244446a3df05e198fa3f8343758276cae77&o=" },
  { id: 2, name: "Ishtar Hotel", city: "Basra", price: 200, rating: 4, roomsAvailable: 8, services: ["Gym", "Swimming Pool", "Restaurant"], image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/29/9c/1a/cristal-grand-ishtar.jpg" },
  { id: 3, name: "Royal City Hotel", city: "Mosul", price: 90, rating: 4, roomsAvailable: 10, services:["WiFi","Restaurant","Free Parking","Family Room"], image:"https://cf.bstatic.com/xdata/images/hotel/max1024x768/414039137.jpg?k=5d042d1b7074f1e875c928a4fbb591d8dbd6d0e5a05e900bcac987f35cb7344b&o=&hp=1" },
  { id: 4, name: "Royal Hotel", city: "Karbala", price: 120, rating: 4, roomsAvailable: 12, services: ["WiFi", "Parking", "Restaurant"], image: "https://dewerly.com/wp-content/uploads/2023/10/photo_28_2023-12-24_01-03-20.jpg" },
  { id: 5, name: "Rayhaan Hotel", city: "Najaf", price: 110, rating: 3, roomsAvailable: 15, services: ["WiFi", "Breakfast"], image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/19/a4/39/caption.jpg?w=1100&h=1100&s=1" },
  { id: 6, name: "Plaza Hotel Kirkuk", city: "Kirkuk", price: 100, rating: 4, roomsAvailable: 20, services: ["Free Parking", "Restaurant"], image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn5c3nPYD5aDGBuWCV1e248PVhV8652WgE8w&s" },
  { id: 7, name: "V Hotel", city: "Anbar", price: 200, rating: 5, roomsAvailable: 10, services:["WiFi","Restaurant","Free Parking","Family Room"], image:"https://cf.bstatic.com/xdata/images/hotel/max1024x768/721372627.jpg?k=671f06b80c58eb21cc79eb3a45fc1f62a3a5671a4180a02c82cce0e627edda50&o=&hp=1" },
  { id: 9, name: "Al Khafaji Hotel", city: "Duhok", price: 100, rating: 4, roomsAvailable: 20, services: ["Free Parking", "Restaurant"], image: "https://ziaratplanner.com/wp-content/uploads/2024/12/WhatsApp-Image-2024-11-21-at-10.56.46-AM.webp" },
  { id: 10, name: "Banoj Hotel", city: "Babil", price: 100, rating: 4, roomsAvailable: 10, services:["WiFi","Restaurant","Free Parking"], image:"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/05/4f/00/a5/banoj-hotel.jpg?w=900&h=500&s=1" },
  { id: 11, name: "Grand Baghdad Hotel", city: "Baghdad", price: 250, rating: 4, roomsAvailable: 12, services:["WiFi","Breakfast"], image:"https://media-cdn.tripadvisor.com/media/photo-s/0f/29/9b/fa/lobby.jpg" },
  { id: 12, name: "Zenat AL-Hayat Basra Hotel", city: "Basra", price: 200, rating: 4, roomsAvailable: 12, services:["WiFi","Breakfast"], image:"https://cf.bstatic.com/xdata/images/hotel/max1024x768/469194111.jpg?k=48c60551bb0ca72fe0312d81a6e1cea8d4b88ed45163488397f67c34ebc68439&o=&hp=1" },
  { id: 13, name: "Alqalea Hotel", city: "Basra", price: 60, rating: 3, roomsAvailable: 8, services:["WiFi","Resturent"], image:"https://lh3.googleusercontent.com/gps-cs-s/AC9h4npckJqA7TRF1WPq8sP7SAIan7zrTTIswBnPYHPh5Zzinc5ylWygU-bZaAXYNuwba1Rh7OEpSs3uBGo_PA5KffGukWF9y7_FKS2FSu5gPacpUh__RZDNlKzTS4tRrrr4SUpGxx6_Zw=w408-h544-k-no" },
  { id: 14, name: "Basrah International Airport Hotel", city: "Basra", price: 280, rating: 4, roomsAvailable: 15, services:["WiFi","Breakfast","Free Parking","Swimming Pool"], image:"https://cf.bstatic.com/xdata/images/hotel/max1024x768/510431076.jpg?k=b461b76da0e5cfc789570feac9040efbac4013427a1f117ca70e5ef742a8b93b&o=" },
  { id: 15, name: "Coral Palace Hotel", city: "Baghdad", price: 250, rating: 4, roomsAvailable: 20, services:["WiFi","Breakfast","Free Parking","Swimming Pool"], image:"https://cf.bstatic.com/xdata/images/hotel/max1024x768/709685185.jpg?k=e6698e9985e3dbd857eaccba55c62adcec6e21bbf3fa88ed47e1f3ac64b92224&o=" },
  { id: 16, name: "Shanasheel Palace Hotel", city: "Baghdad", price: 120, rating: 4, roomsAvailable: 14, services:["WiFi","Resturent","Free Parking"], image:"https://cf.bstatic.com/xdata/images/hotel/max1024x768/40081756.jpg?k=af55786ddd17e2052fc591fd33f469cac08dc19261b3499b7fd4b5e2ec5b597d&o=" },
  { id: 17, name: "The V Hotel", city: "Baghdad", price: 189, rating: 5, roomsAvailable: 23, services:["WiFi","Resturent","Free Parking","Swimming Pool","GYM"], image:"https://cf.bstatic.com/xdata/images/hotel/max1024x768/721372627.jpg?k=671f06b80c58eb21cc79eb3a45fc1f62a3a5671a4180a02c82cce0e627edda50&o=" },
  { id: 18, name: "Malik Dijlah Hotel", city: "Baghdad", price: 63, rating: 3, roomsAvailable: 22, services:["WiFi","Resturent","Free Parking","Swimming Pool","GYM"], image:"https://cf.bstatic.com/xdata/images/hotel/max1024x768/530379571.jpg?k=59a84b80ed8d25b12de6603ad66d87a8665569903dc2886204cee3f12604ccee&o=" },
  { id: 19, name: "Danzha Hotel 2 ", city: "Erbil", price: 50, rating: 3, roomsAvailable: 22, services:["WiFi","Resturent","Free Parking","Family Room","Airport shuttle","GYM"], image:"https://cf.bstatic.com/xdata/images/hotel/max1024x768/707966981.jpg?k=8a850c2939fbaf327575821241caf1e74614b911b534b68abbbd6767e2b1d3dd&o=" },
  { id: 20, name: "Radisson Hotel & Residences Erbil ", city: "Erbil", price: 226, rating: 5, roomsAvailable: 28, services:["WiFi","Resturent","Free Parking","Family Room","Airport shuttle","GYM"], image:"https://cf.bstatic.com/xdata/images/hotel/max1024x768/508242864.jpg?k=3c82a5b9d87c2ec84967d2b3bb81c916de6d9e0ea311382b2a6dcfc961cceaf2&o=" },
  { id: 21, name: "Niagara Hotel Erbil", city: "Erbil", price: 55, rating: 3, roomsAvailable: 30, services:["WiFi","Resturent","Free Parking","Family Room","Airport shuttle"], image:"https://cf.bstatic.com/xdata/images/hotel/max1024x768/320456752.jpg?k=8d0d0b7f923eca1b0602a89ffd58f7532c9c39a03ff6c6e01e860725762e914a&o=" },
  { id: 22, name: "Ramada by Wyndham Erbil Gulan Street", city: "Erbil", price: 150, rating: 3, roomsAvailable: 12, services:["WiFi","Resturent","2 Swimming pools","Free Parking","Family Room","Airport shuttle"], image:"https://cf.bstatic.com/xdata/images/hotel/max1024x768/676244052.jpg?k=e9cbab1c7c27e190a548b04d7ac4eefc781aad0bccd42ff034a7fbb824746ca5&o=" },
  { id: 23, name: "The Best Time Hotel", city: "Erbil", price: 100, rating: 4, roomsAvailable: 17, services:["WiFi","Resturent","Indoor swimming pool","Free Parking","Family Room","Airport shuttle"], image:"https://cf.bstatic.com/xdata/images/hotel/max1024x768/688131161.jpg?k=6b231a74266dba92524f949a6e4903de475477c5ed8c57a246cb599cfa0ccac6&o=" },
  { id: 24, name: "Blue Moon Hotel", city: "Erbil", price: 65, rating: 4, roomsAvailable: 10, services:["WiFi","Resturent","Indoor swimming pool","Free Parking","Family Room","Airport shuttle"], image:"https://cf.bstatic.com/xdata/images/hotel/max1024x768/666228418.jpg?k=d55c811df9746175ef592f070c2a1ae60e70f5fe250ec105fbd7c4e33f264506&o=" },
{ id: 25, name: "Titanic Hotel & SPA ", city: "Sulaymanya", price: 150, rating: 5, roomsAvailable: 17, services:["WiFi","Resturent","Indoor swimming pool","Free Parking","Family Room","Airport shuttle"], image:"https://cf.bstatic.com/xdata/images/hotel/max1024x768/365515494.jpg?k=eab898ea8fe23e291a060fe964073e6ba70f247dcef3db0712a5e307f5805fab&o=&hp=1" },
  { id: 26, name: "Copthorne Hotel Baranan", city: "Sulaymanya", price: 75, rating: 4, roomsAvailable: 10, services:["WiFi","Resturent","Indoor swimming pool","Free Parking","Family Room","Airport shuttle"], image:"https://al-fayha.com/wp-content/uploads/2019/05/copthorne-hotel.jpg" },
{ id: 27, name: "HighCrest Hotel", city: "Sulaymanya", price: 127, rating: 5, roomsAvailable: 12, services:["WiFi","Resturent","Indoor swimming pool","Free Parking","Family Room","Airport shuttle"], image:"https://cf.bstatic.com/xdata/images/hotel/max1024x768/90067739.jpg?k=60c9b4273998a64aeb9bca0b28fa748f2e1162d8c88544bcb69b8377f7b63624&o=&hp=1" },
{ id: 28, name: "Millennium Kurdistan Hotel & Spa ", city: "Sulaymanya", price: 84, rating: 5, roomsAvailable: 10, services:["WiFi","Resturent","Indoor swimming pool","Free Parking","Family Room","Airport shuttle"], image:"https://cf.bstatic.com/xdata/images/hotel/max1024x768/27132016.jpg?k=c59510d0981df0f77b955aab42d5e96473e16334ad4020ceeed73cb09b0fe1ab&o=&hp=1" },
 { id: 29, name: "Najaf Do Hotel", city: "Najaf", price: 140, rating: 5, roomsAvailable: 10, services:["WiFi","Restaurant","Free Parking","Family Room"], image:"https://cf.bstatic.com/xdata/images/hotel/max1024x768/599032023.jpg?k=730f1a9cee4e60a3541085330bf2a3aaeabf2314e2fa125242cb996cc3d7db41&o=&hp=1" },
{ id: 30, name: "Qasr AlDur Hotel", city: "Najaf", price: 135, rating: 5, roomsAvailable: 10, services:["WiFi","Restaurant","Free Parking","Family Room"], image:"https://qasraldur.com/wp-content/uploads/2018/10/Screenshot_15-1024x743.jpg" },
{ id: 31, name: "Zamzam Hotel 2", city: "Najaf", price: 60, rating: 5, roomsAvailable: 10, services:["WiFi","Restaurant","Free Parking","Family Room"], image:"https://cf.bstatic.com/xdata/images/hotel/max1024x768/600272475.jpg?k=c4a5a2dae9a749e26b3fa7fa779ddc2c3aaa53cbde0321640cee4daf495219ae&o=&hp=1" },
{ id: 32, name: "Granada Hotel", city: "Najaf", price: 90, rating: 5, roomsAvailable: 10, services:["WiFi","Restaurant","Free Parking","Family Room"], image:"https://q-xx.bstatic.com/xdata/images/hotel/max500/344594854.jpg?k=37b2895a07d8597c70e2ac18e4760619650f3b6bcc0f2d5465bfa79b3bba35fb&o=" },
{ id: 33, name: "Jar ALAmer Hotel", city: "Najaf", price: 72, rating: 5, roomsAvailable: 10, services:["WiFi","Restaurant","Free Parking","Family Room"], image:"https://cf.bstatic.com/xdata/images/hotel/max1024x768/509182873.jpg?k=ed3c64cc21b1a7f420b6002371878d444c6b814593c1d9b53174e8309474304b&o=&hp=1" },
{ id: 34, name: "Melian Hotel", city: "Najaf", price: 64, rating: 5, roomsAvailable: 10, services:["WiFi","Restaurant","Free Parking","Family Room"], image:"https://cf.bstatic.com/xdata/images/hotel/max1024x768/592041995.jpg?k=3fb81c3c38995b43061fd8449e345da0c2ab646cc52aa35c702774f7792122e0&o=&hp=1" },
{ id: 35, name: "Dilshad Palace Hotel", city: "Duhok", price: 95, rating: 5, roomsAvailable: 10, services:["WiFi","Restaurant","Free Parking","Family Room"], image:"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/05/63/98/ac/dilshad-palace.jpg?w=1200&h=1200&s=1" },
{ id: 36, name: "Coral Hotel", city: "Duhok", price: 80, rating: 4, roomsAvailable: 10, services:["WiFi","Restaurant","Free Parking","Family Room"], image:"https://cf.bstatic.com/xdata/images/hotel/max1024x768/704820972.jpg?k=ee963740ff18b33eb1e88dee19d5b036c327d6da77d0f3a651056cc09e03ba1a&o=&hp=1" },
{ id: 37, name: "DDK Hotel Duhok", city: "Duhok", price: 85, rating: 4, roomsAvailable: 10, services:["WiFi","Restaurant","Free Parking","Family Room"], image:"https://cf.bstatic.com/xdata/images/hotel/max1024x768/423107001.jpg?k=84073db28a13ed30b441f2f91ab6ec61985e75d62ba438e017e7b681cc78cc06&o=&hp=1" },
{ id: 38, name: "Parwar Hotel", city: "Duhok", price: 75, rating: 4, roomsAvailable: 10, services:["WiFi","Restaurant","Free Parking","Family Room"], image:"https://cf.bstatic.com/xdata/images/hotel/max1024x768/450349495.jpg?k=cab7e38f16eb579e76c9a044fe36f727d4b9f79f75b3f318ec68a711a7441519&o=&hp=1" },
{ id: 39, name: "Kristal Hotel Duhok", city: "Duhok", price: 65, rating: 4, roomsAvailable: 10, services:["WiFi","Restaurant","Free Parking","Family Room"], image:"https://cf.bstatic.com/xdata/images/hotel/max1024x768/290096404.jpg?k=2c90658e899969d7b5c9fef4ad32e6f9ab73da2b7f8b49f8446c853a637b4b6b&o=&hp=1" },
{ id: 40, name: "Sofia Hotel", city: "Duhok", price: 80, rating: 4, roomsAvailable: 10, services:["WiFi","Restaurant","Free Parking","Family Room"], image:"https://cf.bstatic.com/xdata/images/hotel/max1024x768/487702701.jpg?k=61af81def6f9816bcebd92823126b78a0ff56cd5880c6e6940f92a1ffae48bfc&o=&hp=1" },
{ id: 41, name: "Sargali Duhok Hotel", city: "Duhok", price: 75, rating: 4, roomsAvailable: 10, services:["WiFi","Restaurant","Free Parking","Family Room"], image:"https://cf.bstatic.com/xdata/images/hotel/max1024x768/505428312.jpg?k=fca9d181edf39da55b1b9b704dcde7023fabfc7c49746aea5410e100e9579692&o=&hp=1" },
{ id: 42, name: "Dur Kassir Alkadhimiya Hotel", city: "Karbala", price: 80, rating: 5, roomsAvailable: 10, services:["WiFi","Restaurant","Free Parking","Family Room"], image:"https://cf.bstatic.com/xdata/images/hotel/max1024x768/494623920.jpg?k=2a8c20e8cc9741e319a06e8f371bd95d13022893b7a7a4f07e6d6bce7650f7e4&o=&hp=1" },
{ id: 43, name: "The Baron Hotel", city: "Karbala", price: 95, rating: 5, roomsAvailable: 10, services:["WiFi","Restaurant","Free Parking","Family Room"], image:"https://cf.bstatic.com/xdata/images/hotel/max1024x768/519532211.jpg?k=06c6a03a91644f188d2617855c50b47b6137854dbd915eccd324ac548abb2b69&o=&hp=1" },
{ id: 44, name: "Teba Karbala Hotel", city: "Karbala", price: 65, rating: 4, roomsAvailable: 10, services:["WiFi","Restaurant","Free Parking","Family Room"], image:"https://cf.bstatic.com/xdata/images/hotel/max1024x768/727866497.jpg?k=1774c786dcb2c7cb3e87f0c6239135a1101c0f30b10bbbeba8b59441b00aa982&o=&hp=1" },
{ id: 45, name: "Alhayat Karbala Hotel", city: "Karbala", price: 80, rating: 4, roomsAvailable: 10, services:["WiFi","Restaurant","Free Parking","Family Room"], image:"https://cf.bstatic.com/xdata/images/hotel/max1024x768/597777548.jpg?k=9cb5b689426d729cb07b08586f68c2117d6e3acb871ce4d6db966fa549cb56f4&o=&hp=1" },
{ id: 46, name: "King Hotel Karbala", city: "Karbala", price: 55, rating: 5, roomsAvailable: 10, services:["WiFi","Restaurant","Free Parking","Family Room"], image:"https://cf.bstatic.com/xdata/images/hotel/max1024x768/535579827.jpg?k=d260106909a3e4d83312d6bf6dc3becc525455971be17b59f78cb6ba3df1058a&o=&hp=1" },
{ id: 47, name: "Gulf Tower", city: "Karbala", price: 78, rating: 5, roomsAvailable: 10, services:["WiFi","Restaurant","Free Parking","Family Room"], image:"https://static.where-e.com/Iraq/Karbala_Governorate/Gulf-Tower-Hotel_b8de855322a7e6d5abfc8db40cd541e5.jpg" },
{ id: 48, name: "Ramada Plaza Hotel", city: "Mosul", price: 311, rating: 4.5, roomsAvailable: 10, services:["WiFi","Restaurant","Free Parking","Family Room","Airport Shuttle"], image:"https://cf.bstatic.com/xdata/images/hotel/max1024x768/715984548.jpg?k=aac92989114abb49cd0d7cb82d69bc495ea019c9e742b918f4297298081cfa93&o=&hp=1" },
{ id: 49, name: "Modern Plaza Hotel", city: "Mosul", price: 100, rating: 4, roomsAvailable: 10, services:["WiFi","Restaurant","Free Parking","Family Room"], image:"https://www.rjtravelagency.com/wp-content/uploads/2023/05/Modern-Plaza-Hotel.jpg" },
{ id: 50, name: "Kahramana Hotel", city: "Mosul", price: 65, rating: 3.5, roomsAvailable: 10, services:["WiFi","Restaurant","Free Parking"], image:"https://dewerly.com/wp-content/uploads/2023/10/277440478_352898963443286_2056129733769361757_n.jpg" },
{ id: 51, name: "Babylon Hotel", city: "Babil", price: 300, rating: 5, roomsAvailable: 10, services:["WiFi","Restaurant","Free Parking","Family Room"], image:"https://cf.bstatic.com/xdata/images/hotel/max1024x768/651543126.jpg?k=a5cbcb792cd9aca61ca86c3b29b995b30e363f6c5d0f2f8f82f06c436b522a42&o=&hp=1" },
{ id: 52, name: "BABEL PARK HOTEL", city: "Babil", price: 123, rating: 4, roomsAvailable: 10, services:["WiFi","Restaurant","Free Parking"], image:"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/03/de/f9/ff/hotel-babel-suites.jpg?w=700&h=400&s=1" },
{ id: 53, name: "Bellitium Hotel", city: "Anbar", price: 170, rating: 4, roomsAvailable: 10, services:["WiFi","Restaurant","Free Parking"], image:"https://media-cdn.tripadvisor.com/media/photo-s/2b/bf/97/3d/caption.jpg" },
{ id: 54, name: "Sumeryoon Hotel", city: "Nasiriyah", price: 100, rating: 4, roomsAvailable: 10, services:["WiFi","Restaurant","Free Parking"], image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1_XK_uvY6JftqE9aE1bcfSxQTlXvcJMqEBg&s" },
{ id: 55, name: "Gudea Hotel", city: "Nasiriyah", price: 125, rating: 5, roomsAvailable: 10, services:["WiFi","Restaurant","Free Parking","Family Room"], image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnSmgmlQqLPO30mkqtlceYX7FZEQBZY6xX2A&s" },
{ id: 56, name: "Al-Zaitoon Hotel and Restaurant", city: "Nasiriyah", price: 60, rating: 3, roomsAvailable: 10, services:["WiFi","Restaurant","Free Parking"], image:"https://c.otcdn.com/imglib/hotelfotos/8/3810/al-zaitoon-hotel-and-restaurant---nasiriyah-20231007080016502200.jpg" },
{ id: 57, name: "Kurmick Maysan Hotel", city: "Amarah", price: 158, rating: 5, roomsAvailable: 10, services:["WiFi","Restaurant","Indoor Pool","Spa","Tennis Court"], image:"https://cf.bstatic.com/xdata/images/hotel/max1024x768/81447566.jpg?k=cf4728ca548afa0dc66e4daff301adbfda69d47a2b14465658958c31f0fa7237&o=&hp=1" },
{ id: 58, name: "Al-Rashid Hotel", city: "Amarah", price: 115, rating: 4, roomsAvailable: 10, services:["WiFi","Restaurant","Fitness Center","Meeting Rooms"], image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXlg47KEuJO4QcGYTHbHC6PMPW-CqUgEnoZQ&s" },
{ id: 59, name: "Al-Madina Hotel", city: "Amarah", price: 90, rating: 3, roomsAvailable: 10, services:["WiFi","Restaurant","Free Parking"], image:"https://maysangroup.com/wp-content/uploads/2024/12/WhatsApp-Image-2024-12-21-at-11.00.36-AM-1.jpeg" },
{ id: 60, name: "Al-Nour Hotel", city: "Amarah", price: 80, rating: 3, roomsAvailable: 10, services:["WiFi","Free Parking"], image:"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/d7/ae/75/caption.jpg?w=500&h=-1&s=1" },
{ id: 61, name: "Al Ghadeer Palace Tourist Hotel", city: "Samawah", price: 70, rating: 3, roomsAvailable: 10, services:["WiFi","Restaurant","Free Parking"], image:"https://photos.wikimapia.org/p/00/04/19/11/06_big.jpg" },
{ id: 62, name: "Al-Madina Hotel", city: "Samawah", price: 80, rating: 3, roomsAvailable: 10, services:["WiFi","Restaurant","Free Parking"], image:"https://q-xx.bstatic.com/xdata/images/hotel/max400/29684374.jpg?k=79f321c11f453254db7d99547edda7d5ee908f8aa0c3840fa9af3a6646e11073" },
{ id: 63, name: "Al-Jawhara Hotel", city: "Al-Kut", price: 65, rating: 3, roomsAvailable: 10, services:["WiFi","Restaurant","Free Parking"], image:"https://cf.bstatic.com/xdata/images/hotel/max1024x768/242849310.jpg?k=446e4a3d6526ed6ddcd7d25de037d5ae284770f702eaa32d168e39f270f03d42&o=&hp=1" },
{ id: 64, name: "Zahraa Palace Hotel", city: "Al-Kut", price: 98, rating: 4, roomsAvailable: 10, services:["WiFi","Restaurant","Conference Rooms","Free Parking"], image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTvDV9gWu1CnBQmLGrCktJQ-Hco6oiS9ca8Q&s" },
{ id: 65, name: "Huda Hotel", city: "Al-Kut", price: 73, rating: 3, roomsAvailable: 10, services:["WiFi","Restaurant","Free Parking"], image:"https://images.mawazin.net/root/root/images/201192018_BCEDE0C9-B21C-4A58-8DAF-D6ECFF8730C6.jpeg" },
{ id: 71, name: "Princes Tower Hotel", city: "Al-Diwaniyah", price: 55, rating: 3, roomsAvailable: 10, services:["WiFi","Restaurant","Free Parking"], image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-bnJxV2IkOZZtIhHpsEwA7m6Se0ewyw3Ziw&s" },
{ id: 72, name: "Ribal Hotel", city: "Al-Diwaniyah", price: 60, rating: 3, roomsAvailable: 10, services:["WiFi","Restaurant","Free Parking"], image:"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/b0/a1/bd/getlstd-property-photo.jpg?w=1200&h=-1&s=1" },
{ id: 73, name: "Al-Khalil Hotel", city: "Diyala", price: 60, rating: 3, roomsAvailable: 10, services:["WiFi","Restaurant","Free Parking"], image:"https://q-xx.bstatic.com/xdata/images/hotel/max400/608109011.jpg?k=7242026fe686e51cf6e37f95384514fc4c683b90e645fc370341594ae914ab16" },
{ id: 74, name: "Al-Mustafa Hotel", city: "Diyala", price: 70, rating: 3, roomsAvailable: 10, services:["WiFi","Restaurant","Free Parking"], image:"https://media.shafaq.com/media/arcella/1665134472748.jpg" },

];

function App() {
  const [selectedCity, setSelectedCity] = useState("All");
  const [selectedRating, setSelectedRating] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState("All");
  const [filteredHotels, setFilteredHotels] = useState(hotels);

  const [form, setForm] = useState({ hotelId: "", customer: "", checkIn: "", checkOut: "", rooms: 1 });
  const [bookings, setBookings] = useState([]);
  const [showBookingCard, setShowBookingCard] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [currentBooking, setCurrentBooking] = useState(null);

  const [showFilters, setShowFilters] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("bookings") || "[]");
    setBookings(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("bookings", JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    let result = hotels;
    if (selectedCity !== "All") result = result.filter(h => h.city === selectedCity);
    if (selectedRating !== "All") result = result.filter(h => h.rating === Number(selectedRating));
    if (selectedPrice !== "All") {
      if (selectedPrice === "low") result = result.filter(h => h.price < 100);
      if (selectedPrice === "mid") result = result.filter(h => h.price >= 100 && h.price <= 200);
      if (selectedPrice === "high") result = result.filter(h => h.price > 200);
    }
    setFilteredHotels(result);
  }, [selectedCity, selectedRating, selectedPrice]);

  const handleBook = (e) => {
    e.preventDefault();
    const hotel = hotels.find(h => h.id === Number(form.hotelId));
    if (!hotel) return;
    const nights = (new Date(form.checkOut) - new Date(form.checkIn)) / (1000 * 60 * 60 * 24);
    if (nights <= 0) { alert("Check booking dates!"); return; }
    const total = nights * form.rooms * hotel.price;
    const booking = { ...form, id: Date.now(), hotelName: hotel.name, city: hotel.city, nights, total, services: hotel.services };
    setBookings([...bookings, booking]);
    setForm({ hotelId: "", customer: "", checkIn: "", checkOut: "", rooms: 1 });
    setCurrentBooking(booking);
    setShowBookingForm(false);
    setShowBookingCard(true);
  };

  const handleCancel = (id) => {
    setBookings(bookings.filter(b => b.id !== id));
    if (currentBooking?.id === id) {
      setShowBookingCard(false);
      setCurrentBooking(null);
    }
  };

  return (
    <div className="bg-[#DDE6ED] min-h-screen text-[#27374D] relative">
      {/* Hero */}
      <section className="relative">
        <img src="https://images.unsplash.com/photo-1501117716987-c8e1ecb210ff"
             alt="Resort"
             className="w-full h-[400px] object-cover rounded-b-3xl"/>
        <div className="absolute top-0 left-0 w-full h-full bg-black/40 flex flex-col items-center justify-center text-center text-white px-4 gap-4">
          <h2 className="text-4xl font-bold mb-3">Find your next stay</h2>
          <p className="mb-6 text-lg">Book Hotels And Unlock Your Perfect Getway</p>
          <div className="flex gap-4">
            <button onClick={() => setShowBookingForm(!showBookingForm)} className="confirm-btn">Book Now!</button>
            <button onClick={() => {
              if (bookings.length === 0) {
                alert("No bookings found");
              } else {
                setShowBookingCard(!showBookingCard);
              }
            }} className="city-btn">Show My Booking</button>
          </div>
        </div>
      </section>

      {/* Filter Button */}
      <button 
        onClick={() => setShowFilters(!showFilters)}
        className="absolute top-6 right-6 bg-white shadow-md p-2 rounded-full hover:bg-gray-200"
      >
        ⚙️
      </button>

      {/* Filters */}
      {showFilters && (
        <div className="absolute top-16 right-6 bg-white p-4 rounded-xl shadow-lg flex flex-col gap-2 w-[200px] z-40">
          <div className="flex flex-col">
            <label className="font-semibold mb-1">City</label>
            <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
              <option value="All">All Cities</option>
              {[...new Set(hotels.map(h => h.city))].map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="font-semibold mb-1">Rating</label>
            <select value={selectedRating} onChange={(e) => setSelectedRating(e.target.value)}>
              <option value="All">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="font-semibold mb-1">Price</label>
            <select value={selectedPrice} onChange={(e) => setSelectedPrice(e.target.value)}>
              <option value="All">All Prices</option>
              <option value="low">Less than $100</option>
              <option value="mid">$100 - $200</option>
              <option value="high">More than $200</option>
            </select>
          </div>
        </div>
      )}

      {/* Hotels */}
      <section className="max-w-6xl mx-auto px-4 pt-10">
        <h2 className="text-3xl font-bold mb-6 text-center">Popular Hotels</h2>
        {filteredHotels.length === 0 ? (
          <p className="text-center text-gray-600">No hotels match your filters.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredHotels.map(hotel => (
              <div 
                key={hotel.id} 
                className="hotel-card cursor-pointer"
                onClick={() => setSelectedHotel(hotel)}
              >
                <img src={hotel.image} alt={hotel.name}/>
                <div className="info">
                  <h2>{hotel.name}</h2>
                  <p>{hotel.city}</p>
                  <p className="text-green-600 font-bold">💵 ${hotel.price}/night</p>
                  <p>🌟 {hotel.rating} Stars</p>
                  <p>🛏 {hotel.roomsAvailable} Rooms</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

    {/* Footer */}
       <footer className="bg-[#27374D] text-[#DDE6ED] text-center py-4 mt-10 rounded-t-3xl flex flex-col md:flex-row items-center justify-center gap-6">
    <p className="text-sm">📞 +964 770 000 0000</p>
    <p className="text-sm">✉️ contact@bookiraq.com</p>
    <h3 className="text-lg font-bold">Bookiraq</h3>
       </footer>

      {/* Hotel Details */}
      {selectedHotel && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="booking-card text-[#27374D] bg-white p-6 rounded-2xl shadow-2xl max-w-md w-full relative">
            <button onClick={() => setSelectedHotel(null)} className="close-btn">✖</button>
            <img src={selectedHotel.image} alt={selectedHotel.name} className="rounded-lg mb-4"/>
            <h2 className="text-2xl font-bold">{selectedHotel.name}</h2>
            <p><strong>City:</strong> {selectedHotel.city}</p>
            <p><strong>Price:</strong> ${selectedHotel.price} / night</p>
            <p><strong>Rating:</strong> {selectedHotel.rating} Stars</p>
            <p><strong>Available Rooms:</strong> {selectedHotel.roomsAvailable}</p>
            <p><strong>Services:</strong> {selectedHotel.services.join(", ")}</p>
          </div>
        </div>
      )}

      {/* Booking Form */}
      {showBookingForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="booking-card max-w-md w-full relative space-y-4">
            <button onClick={() => setShowBookingForm(false)} className="close-btn">✖</button>
            <h2 className="text-2xl font-bold border-b border-[#9DB2BF] pb-2">Book Your Stay</h2>
            <form onSubmit={handleBook} className="space-y-4">
              <div className="flex flex-col">
                <label>Select Hotel</label>
                <select value={form.hotelId} onChange={e => setForm({ ...form, hotelId: e.target.value })} required>
                  <option value="">-- Choose a hotel --</option>
                  {filteredHotels.map(h => <option key={h.id} value={h.id}>{h.name} - {h.city}</option>)}
                </select>
              </div>
              <div className="flex flex-col">
                <label>Guest Name</label>
                <input type="text" value={form.customer} onChange={e => setForm({ ...form, customer: e.target.value })} required/>
              </div>
              <div className="flex flex-col md:flex-row md:gap-4">
                <div className="flex-1">
                  <label>Check-in Date</label>
                  <input type="date" value={form.checkIn} onChange={e => setForm({ ...form, checkIn: e.target.value })} required/>
                </div>
                <div className="flex-1 mt-4 md:mt-0">
                  <label>Check-out Date</label>
                  <input type="date" value={form.checkOut} onChange={e => setForm({ ...form, checkOut: e.target.value })} required/>
                </div>
              </div>
              <div className="flex flex-col">
                <label>Number of Rooms</label>
                <input type="number" min="1" value={form.rooms} onChange={e => setForm({ ...form, rooms: Number(e.target.value) })} required/>
              </div>
              <button type="submit" className="confirm-btn w-full">Confirm Booking</button>
            </form>
          </div>
        </div>
      )}

      {/* Booking Card */}
      {showBookingCard && currentBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="booking-card max-w-md w-full relative">
            <button onClick={() => setShowBookingCard(false)} className="close-btn">✖</button>
            <h2 className="text-2xl font-bold border-b border-[#9DB2BF] pb-2">Booking Details</h2>
            <div className="mt-4 space-y-2">
              <p><strong>Hotel:</strong> {currentBooking.hotelName}</p>
              <p><strong>Guest:</strong> {currentBooking.customer}</p>
              <p><strong>City:</strong> {currentBooking.city}</p>
              <p><strong>Check-in:</strong> {currentBooking.checkIn}</p>
              <p><strong>Check-out:</strong> {currentBooking.checkOut}</p>
              <p><strong>Nights:</strong> {currentBooking.nights}</p>
              <p><strong>Rooms:</strong> {currentBooking.rooms}</p>
              <p><strong>Total:</strong> ${currentBooking.total}</p>
              <p><strong>Services:</strong> {currentBooking.services.join(", ")}</p>
            </div>
            <button onClick={() => handleCancel(currentBooking.id)}>Cancel Booking</button>
          </div>
        </div>
      )}
    </div>
  );
}
export default App;

