
# <a href="https://painting-ecommerce.vercel.app/" target="_blank">Trivart</a>

Trivart is a fully functional Ecommerse platform that enables user to create there account and browse different category of art items and order them. Managed by one Admin Where Admin can create product manage products subcategory. Check all the queries submitted by user from website. Manage the State(Shipped,Delivered,Cancelled) of Orders. Create and manage Coupons.
This platform is built using React,PostgrSql,Redis,GoLang.

Trivart aims to provide 
 A seamless and ineractive Ecommerse experience for Customers and Admins.

 ## System Architecture <br/>
 Trivart platform consists of three main components: Frontend,Backend,Database.
 This System follows client-server Architecture.

  ### Frontend <br/>
 The front end of this platform is build using ReactJs,Chakra-ui,Acertinity-ui.React js allows for the creation of dynamic and responsive user interface.

### Backend <br/>
The Backend of the platform is built using Fiber which is a GoLang libray similar of Express. We used Fiber and Go instead of Nodejs beacuse of its easy to use , fast compared other framworks avilable, concurrency support, easy to handle large amount of users without doing any extra tunning.

### Database <br/>
The database of this platform is build using PostgreSql and Redis. PostgreSql allowsf or the storage of relational data in most efficient way and it is used by most of the Ecommerse platforms. SQL language support for interacting with database.
Redis is used for RefreshToken storing and most frequently accesed products.

### Architecture Design <br/>
Here is the high-level diagram that illustrates the architecture of the Trivart Ecommerse platform.


![diagram-export-9-6-2024-9_21_03-AM](https://github.com/user-attachments/assets/66ad0365-cdc7-414b-817e-044598c72795)


### Frontend: <br/>
Frontend is the part of the platform where user interacts with most. It is the face of the platform.
The frontend of this platform has this pages and functionality <br/>

- HomePage: This page will have a brief introduction to the platform, as well as some featured products.

- Shop Page- category wise some top products are listed here.User can browse the products and click view more for more items.

- Shop list: This is the page where all the products are listed and a filter is given in left side to filter and sort the products. All types of Filters are avilable to find your desired Product.

- Product Details Page: Where you can look closely about the product add to cart, buy now,Set Quantity,Add to favourite.

- Cart Page-Add or remove items from Cart, Coupon apply feature and checkout

- Order: Here if you have any default address that will be fetched automatically if not then it will ask you to add one. After that you can confirm Order.
- Account Section <br/>
   - Order: Manage orders
   - Address:Add, Update,Delete address,Set default
   - Password: Password Change
   - Account:Delete your account
-About ,Contact Us page have usuaal functionality as they required.

## Data Models and Database Schema: <br/>
The back end of Trivart uses a range of data models and database schemas to manage data. Overall, the back-end of Trivart is designed to provide a robust and scalable solution for an Ecommerse platform, with a focus on security, reliability, and ease of use.
![Screenshot from 2024-08-16 02-08-16](https://github.com/user-attachments/assets/48ce7ba0-ff35-4497-be21-90ccbed8d860)


### Api Design<br/>
The Trivart platform's API is designed following the REST architectural style.
Follow this to know more About Api
- [ApiDocs](https://documenter.getpostman.com/view/26905530/2sA3rxqD9b)

Deployment:
The Deployment process for the Trivart will involve hosting the service in various cloud platform.Frontend can be deployed in vercel.The backend Requires more care we already created a docker-compose file you just need to run that file to up and run the backend. Deployment process is written here with most detailed way.We implemented a script for easy backups from psql directly push that to github repo you can find that folder here.
- [Deployment & Contribution Guide](https://github.com/Niladri2003/Painting-Ecommerce/tree/main/server#readme)

### Future Enhancements:<br/>
- User Analytics Collection: User activiy tracking in the website.
- Product Perfomance Tracking: Most viewd , Most bought, Most Clicked products.
- Elastic Search: Implementation for fast and user centric search feature.
- Verification:  For non google Signups we will use Otp.
## Technologies Used
- **Programming Languages:** 
  - <img src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" width="16"> JavaScript
  - <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB-LMXKauSZAPS91OF7OKnBwwUVl7xPr1v1Q&s" width ="25"> Golang
- **Database Management:** 
  - <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHhYIgLQICyLdxxt1uEcA4mTUM8-kNrMMMQA&s" width="16"> PostgreSQL
  - <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfJ0B70T5fmJc-C3Mc1r8ouFs2zTNLIQVJ6w&s" width="16" >Redis
- **Frameworks and Libraries:** 
  - <img src="https://www.devonblog.com/wp-content/uploads/2022/06/tailwind-thumb.jpg" width="28"> Tailwind CSS
  - <img src="https://reactjs.org/favicon.ico" width="25"> React
  - <img src="https://repository-images.githubusercontent.com/234231371/00fd8700-5430-11ea-820b-15fd85b2472c" width="25"> Fiber
- **Other Tools:** 
  - <img src="https://cloudinary.com/favicon.ico" width="25"> Cloudinary
  - <img src="https://git-scm.com/favicon.ico" width="25"> Git
  - <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRULf2JOHbvkPux8pEzQrkH70TVSpfgRMzgQA&s" width="35"> AWS EC2
  - <img src="https://www.mailgun.com/favicon.ico" width="25"> Mailgun
  - <img src="https://res.cloudinary.com/postman/image/upload/t_team_logo/v1629869194/team/2893aede23f01bfcbd2319326bc96a6ed0524eba759745ed6d73405a3a8b67a8" width="16"> Postman
## Made With ❤️ By 
<p align="center">
   <a href="https://github.com/arnabpal16"><img src="https://github.com/arnabpal16.png" width="80" alt="Arnab" style="border-radius: 50%;"></a>
  <a href="https://github.com/swarnab007"><img src="https://github.com/Abhisheksantra28.png" width="80" alt="Abhishek" style="border-radius: 50%;"></a>
  <a href="https://github.com/Niladri2003"><img src="https://github.com/Niladri2003.png" width="80" alt="Niladri" style="border-radius: 50%;"></a>
  <a href="https://github.com/Niladri2003"><img src="https://github.com/Dev-akash77.png" width="80" alt="Akash Biswas" style="border-radius: 50%;"></a>
 
</p>
