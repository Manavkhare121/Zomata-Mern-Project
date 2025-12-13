import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/Main.css"; // Assuming you pasted your CSS here
// Import Icons
import { IoSearchOutline, IoMenuOutline, IoCloseOutline, IoStar, IoCheckmarkOutline, IoCalendarOutline, IoPersonOutline, IoArrowForward, IoLogoFacebook, IoLogoTwitter, IoLogoInstagram, IoLogoPinterest, IoChevronUp } from 'react-icons/io5';

// --- IMPORT YOUR IMAGES HERE ---
// (Example imports - ensure filenames match your assets folder)
import heroBg from '../../assests/images/hero-bg.jpg';
import heroBannerBg from '../../assests/images/hero-banner-bg.png';
import heroBanner from '../../assests/images/hero-banner.png';
import promo1 from '../../assests/images/promo-1.png';
import promo2 from '../../assests/images/promo-2.png';
import promo3 from '../../assests/images/promo-3.png';
import promo4 from '../../assests/images/promo-4.png';
import promo5 from '../../assests/images/promo-5.png';
import aboutBanner from '../../assests/images/about-banner.png';
import saleShapeRed from '../../assests/images/sale-shape-red.png';
import food1 from '../../assests/images/food-menu-1.png';
import food2 from '../../assests/images/food-menu-2.png';
import food3 from '../../assests/images/food-menu-30.png'; // Updated based on your filenames
import food4 from '../../assests/images/food-menu-4.png';
import food5 from '../../assests/images/food-menu-5.png';
import food6 from '../../assests/images/food-menu-6.png';
import ctaBanner from '../../assests/images/cta-banner.png';
import deliveryBg from '../../assests/images/delivery-banner-bg.png';
import deliveryBoy from '../../assests/images/delivery-boy.svg';
import avatar1 from '../../assests/images/avatar-1.jpg';
import avatar2 from '../../assests/images/avatar-2.jpg';
import avatar3 from '../../assests/images/avatar-3.jpg';
import banner1 from '../../assests/images/banner-1.jpg';
import banner2 from '../../assests/images/banner-2.jpg';
import banner3 from '../../assests/images/banner-3.jpg';
import banner4 from '../../assests/images/banner-4.jpg';
import blog1 from '../../assests/images/blog-1.jpg';
import blog2 from '../../assests/images/blog-2.jpg';
import blog3 from '../../assests/images/blog-3.jpg';
import footerIllu from '../../assests/images/footer-illustration.png';
import saleShape from '../../assests/images/sale-shape.png';
import fork from '../../assests/images/fork.png'
import chef from '../../assests/images/chef.png'
// --- DYNAMIC DATA CONFIGURATION ---
const promoData = [
  { title: "Maxican Pizza", text: "Food is any substance consumed to provide nutritional support.", img: promo1 },
  { title: "Soft Drinks", text: "Food is any substance consumed to provide nutritional support.", img: promo2 },
  { title: "French Fry", text: "Food is any substance consumed to provide nutritional support.", img: promo3 },
  { title: "Burger Kingo", text: "Food is any substance consumed to provide nutritional support.", img: promo4 },
  { title: "Chicken Masala", text: "Food is any substance consumed to provide nutritional support.", img: promo5 },
];

const foodMenuData = [
  { title: "Fried Chicken Unlimited", category: "Chicken", price: "49.00", oldPrice: "69.00", badge: "-15%", img: food1 },
  { title: "Burger King Whopper", category: "Noddles", price: "29.00", oldPrice: "39.00", badge: "-10%", img: food2 },
  { title: "White Castle Pizzas", category: "Pizzas", price: "149.00", oldPrice: "169.00", badge: "-25%", img: food5 },
  { title: "Bell Burrito Supreme", category: "Burrito", price: "59.00", oldPrice: "69.00", badge: "-20%", img: food4 },
  { title: "Kung Pao Chicken BBQ", category: "Nuggets", price: "49.00", oldPrice: "69.00", badge: "-5%", img: food3 },
  { title: "Wendy's Chicken", category: "Chicken", price: "49.00", oldPrice: "99.00", badge: "-15%", img: food6 },
];

const testimonialsData = [
  { name: "Robert William", title: "CEO Kingfisher", text: "I would be lost without restaurant. I would like to personally thank you.", img: avatar1 },
  { name: "Thomas Josef", title: "CEO Getforce", text: "I would be lost without restaurant. I would like to personally thank you.", img: avatar2 },
  { name: "Charles Richard", title: "CEO Angela", text: "I would be lost without restaurant. I would like to personally thank you.", img: avatar3 },
];

const blogData = [
  { title: "What Do You Think About Cheese Pizza Recipes?", date: "Nov 8 2025", author: "Gautam Singh", badge: "Pizza", img: blog1 },
  { title: "Making Chicken Strips With New Delicious Ingridents.", date: "Sep 11 2025", author: "Ayush Sharma", badge: "Burger", img: blog2 },
  { title: "Innovative Hot Chessyraw Pasta Make Creator Fact.", date: "Oct 20 2025", author: "Manav Khare", badge: "Chicken", img: blog3 },
];


// --- COMPONENTS ---

const Header = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [modal, setModalopen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`header ${active || isScrolled ? 'active' : ''}`} data-header>
      <div className="container">
        <h1>
          <a href="#home" className="Png">SnakoGram<span className="span">.</span></a>
        </h1>

        <nav className={`navbar ${active ? 'active' : ''}`} data-navbar>
          <ul className="navbar-list">
            {['Home', 'About Us', 'Shop', 'Blog', 'Contact Us'].map((item) => (
              <li className="nav-item" key={item}>
                <a href={`#${item.toLowerCase().replace(' ', '-')}`} className="navbar-link" data-nav-link>{item}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-btn-group">
          <button className="search-btn" aria-label="Search" onClick={() => setSearchOpen(!searchOpen)}>
            <IoSearchOutline />
          </button>
          <button className="btn btn-hover" onClick={() => setModalopen(true)}>
            Reservation
          </button>

          {modal && (
            <div className="modal-overlay">
              <div className="modal">
                <header>
                  <h2>Choose Your Role</h2>
                  <button onClick={() => setModalopen(false)}>
                    <IoCloseOutline />
                  </button>
                </header>

                <div className="modal-users">
                  <div className="left-user" onClick={() => navigate("/user/login")}>
                    <img src={fork} alt="" />
                    <p>User</p>
                  </div>

                  <div className="right-user" onClick={() => navigate("/food-partner/login")}>
                    <img src={chef} alt="" />
                    <p>Partner</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <button className="nav-toggle-btn" aria-label="Toggle Menu" onClick={() => setActive(!active)}>
            <span className="line top"></span>
            <span className="line middle"></span>
            <span className="line bottom"></span>
          </button>
        </div>
      </div>

      <div className={`search-container ${searchOpen ? 'active' : ''}`}>
        <div className="search-box">
          <input type="search" name="search" placeholder="Type keywords here..." className="search-input" />
          <button className="search-submit" aria-label="Submit search"><IoSearchOutline /></button>
        </div>
        <button className="search-close-btn" aria-label="Cancel search" onClick={() => setSearchOpen(false)}>
          <IoCloseOutline size={30} />
        </button>
      </div>
    </header>
  );
};

const Hero = () => {
  return (
    <section className="hero" id="home" style={{ backgroundImage: `url(${heroBg})` }}>
      <div className="container">
        <div className="hero-content">
          <p className="hero-subtitle">Eat Sleep And</p>
          <h2 className="h1 hero-title">Supper delicious Burger in town!</h2>
          <p className="hero-text">Food is any substance consumed to provide nutritional support for an organism.</p>
          <button className="btn">Book A Table</button>
        </div>
        <figure className="hero-banner">
          <img src={heroBannerBg} width="820" height="716" alt="" aria-hidden="true" className="w-100 hero-img-bg" />
          <img src={heroBanner} width="700" height="637" loading="lazy" alt="Burger" className="w-100 hero-img" />
        </figure>
      </div>
    </section>
  );
};

const PromoSection = () => {
  return (
    <section className="section section-divider white promo">
      <div className="container">
        <ul className="promo-list has-scrollbar">
          {promoData.map((item, index) => (
            <li className="promo-item" key={index}>
              <div className="promo-card">
                {/* Note: I've replaced the massive SVG with the Image for cleaner code, 
                    or you can import specific Icons from react-icons/io5 if you prefer icons */}
                <h3 className="h3 card-title">{item.title}</h3>
                <p className="card-text">{item.text}</p>
                <img src={item.img} width="300" height="300" loading="lazy" alt={item.title} className="w-100 card-banner" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section className="section section-divider gray about" id="about">
      <div className="container">
        <div className="about-banner">
          <img src={aboutBanner} width="509" height="459" loading="lazy" alt="Burger with Drinks" className="w-100 about-img" />
          <img src={saleShapeRed} width="216" height="226" alt="get up to 50% off now" className="abs-img scale-up-anim" />
        </div>
        <div className="about-content">
          <h2 className="h2 section-title">Caferio, Burgers, and Best Pizzas <span className="span">in Town!</span></h2>
          <p className="section-text">The restaurants in Hangzhou also catered to many northern Chinese who had fled south...</p>
          <ul className="about-list">
            {["Delicious & Healthy Foods", "Specific Family And Kids Zone", "Music & Other Facilities", "Fastest Food Home Delivery"].map(text => (
              <li className="about-item" key={text}>
                <IoCheckmarkOutline />
                <span className="span">{text}</span>
              </li>
            ))}
          </ul>
          <button className="btn btn-hover">Order Now</button>
        </div>
      </div>
    </section>
  );
};

const FoodMenu = () => {
  return (
    <section className="section food-menu" id="food-menu">
      <div className="container">
        <p className="section-subtitle">Popular Dishes</p>
        <h2 className="h2 section-title">Our Delicious <span className="span">Foods</span></h2>
        <p className="section-text">Food is any substance consumed to provide nutritional support for an organism.</p>

        <ul className="fiter-list">
          {['All', 'Pizza', 'Burger', 'Drinks', 'Sandwich'].map((btn, i) => (
            <li key={i}><button className={`filter-btn ${i === 0 ? 'active' : ''}`}>{btn}</button></li>
          ))}
        </ul>

        <ul className="food-menu-list">
          {foodMenuData.map((item, index) => (
            <li key={index}>
              <div className="food-menu-card">
                <div className="card-banner">
                  <img src={item.img} width="300" height="300" loading="lazy" alt={item.title} className="w-100" />
                  <div className="badge">{item.badge}</div>
                  <button className="btn food-menu-btn">Order Now</button>
                </div>
                <div className="wrapper">
                  <p className="category">{item.category}</p>
                  <div className="rating-wrapper">
                    {[1,2,3,4,5].map(star => <IoStar key={star} />)}
                  </div>
                </div>
                <h3 className="h3 card-title">{item.title}</h3>
                <div className="price-wrapper">
                  <p className="price-text">Price:</p>
                  <data className="price">₹{item.price}</data>
                  <del className="del">₹{item.oldPrice}</del>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

const CTA = () => {
  return (
    <section className="section section-divider white cta" style={{ backgroundImage: `url(${heroBg})` }}>
      <div className="container">
        <div className="cta-content">
          <h2 className="h2 section-title">The SnakoGram Have Excellent Of <span className="span">Quality Burgers!</span></h2>
          <p className="section-text">The restaurants in Hangzhou also catered to many northern Chinese who had fled south...</p>
          <button className="btn btn-hover">Order Now</button>
        </div>
        <figure className="cta-banner">
          <img src={ctaBanner} width="700" height="637" loading="lazy" alt="Burger" className="w-100 cta-img" />
          
          {/* --- FIX IS HERE --- */}
          <img 
            src={saleShape} 
            width="216" 
            height="226" 
            loading="lazy" 
            alt="get up to 50% off now" 
            className="abs-img scale-up-anim" 
          />

        </figure>
      </div>
    </section>
  );
};
const Delivery = () => {
  return (
    <section className="section section-divider gray delivery">
      <div className="container">
        <div className="delivery-content">
          <h2 className="h2 section-title">A Moments Of Delivered On <span className="span">Right Time</span> & Place</h2>
          <p className="section-text">The restaurants in Hangzhou also catered to many northern Chinese who had fled south...</p>
          <button className="btn btn-hover">Order Now</button>
        </div>
        <figure className="delivery-banner">
          <img src={deliveryBg} width="700" height="602" loading="lazy" alt="clouds" className="w-100" />
          <img src={deliveryBoy} width="1000" height="880" loading="lazy" alt="delivery boy" className="w-100 delivery-img" />
        </figure>
      </div>
    </section>
  );
};

const Testimonials = () => {
  return (
    <section className="section section-divider white testi">
      <div className="container">
        <p className="section-subtitle">Testimonials</p>
        <h2 className="h2 section-title">Our Customers <span className="span">Reviews</span></h2>
        <p className="section-text">Food is any substance consumed to provide nutritional support for an organism.</p>

        <ul className="testi-list has-scrollbar">
          {testimonialsData.map((item, index) => (
            <li className="testi-item" key={index}>
              <div className="testi-card">
                <div className="profile-wrapper">
                  <figure className="avatar">
                    <img src={item.img} width="80" height="80" loading="lazy" alt={item.name} />
                  </figure>
                  <div>
                    <h3 className="h4 testi-name">{item.name}</h3>
                    <p className="testi-title">{item.title}</p>
                  </div>
                </div>
                <blockquote className="testi-text">"{item.text}"</blockquote>
                <div className="rating-wrapper">
                  {[1,2,3,4,5].map(star => <IoStar key={star} />)}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

const Banner = () => {
  return (
    <section className="section section-divider gray banner">
      <div className="container">
        <ul className="banner-list">
          <li className="banner-item banner-lg">
            <div className="banner-card">
              <img src={banner1} width="550" height="450" loading="lazy" alt="Discount" className="banner-img" />
              <div className="banner-item-content">
                <p className="banner-subtitle">50% Off Now!</p>
                <h3 className="banner-title">Discount For Delicious Tasty Burgers!</h3>
                <p className="banner-text">Sale off 50% only this week</p>
                <button className="btn">Order Now</button>
              </div>
            </div>
          </li>
          <li className="banner-item banner-sm">
            <div className="banner-card">
              <img src={banner2} width="550" height="465" loading="lazy" alt="Pizza" className="banner-img" />
              <div className="banner-item-content">
                <h3 className="banner-title">Delicious Pizza</h3>
                <p className="banner-text">50% off Now</p>
                <button className="btn">Order Now</button>
              </div>
            </div>
          </li>
          <li className="banner-item banner-sm">
            <div className="banner-card">
              <img src={banner3} width="550" height="465" loading="lazy" alt="Burgers" className="banner-img" />
              <div className="banner-item-content">
                <h3 className="banner-title">Indian Burgers</h3>
                <p className="banner-text">50% off Now</p>
                <button className="btn">Order Now</button>
              </div>
            </div>
          </li>
          <li className="banner-item banner-md">
            <div className="banner-card">
              <img src={banner4} width="550" height="220" loading="lazy" alt="Tasty" className="banner-img" />
              <div className="banner-item-content">
                <h3 className="banner-title">Tasty Buzzed Pizza</h3>
                <p className="banner-text">Sale off 50% only this week</p>
                <button className="btn">Order Now</button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};

const Blog = () => {
  return (
    <section className="section section-divider white blog" id="blog">
      <div className="container">
        <p className="section-subtitle">Latest Blog Posts</p>
        <h2 className="h2 section-title">This Is All About <span className="span">Foods</span></h2>
        <p className="section-text">Food is any substance consumed to provide nutritional support for an organism.</p>

        <ul className="blog-list">
          {blogData.map((item, index) => (
            <li key={index}>
              <div className="blog-card">
                <div className="card-banner">
                  <img src={item.img} width="600" height="390" loading="lazy" alt={item.title} className="w-100" />
                  <div className="badge">{item.badge}</div>
                </div>
                <div className="card-content">
                  <div className="card-meta-wrapper">
                    <a href="#" className="card-meta-link">
                      <IoCalendarOutline />
                      <time className="meta-info">{item.date}</time>
                    </a>
                    <a href="#" className="card-meta-link">
                      <IoPersonOutline />
                      <p className="meta-info">{item.author}</p>
                    </a>
                  </div>
                  <h3 className="h3">
                    <a href="#" className="card-title">{item.title}</a>
                  </h3>
                  <p className="card-text">Financial experts support or help you to to find out which way you can raise your funds more...</p>
                  <a href="#" className="btn-link">
                    <span>Read More</span>
                    <IoArrowForward />
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top" style={{ backgroundImage: `url(${footerIllu})` }}>
        <div className="container">
          <div className="footer-brand">
            <a href="" className="Png">SnakoGram<span className="span">.</span></a>
            <p className="footer-text">Financial experts support or help you to to find out which way you can raise your funds more.</p>
            <ul className="social-list">
              <li><a href="#" className="social-link"><IoLogoFacebook /></a></li>
              <li><a href="#" className="social-link"><IoLogoTwitter /></a></li>
              <li><a href="#" className="social-link"><IoLogoInstagram /></a></li>
              <li><a href="#" className="social-link"><IoLogoPinterest /></a></li>
            </ul>
          </div>

          <ul className="footer-list">
            <li><p className="footer-list-title">Contact Info</p></li>
            <li><p className="footer-list-item">+916210999222</p></li>
            <li><p className="footer-list-item">inf@snakogramGmail24.com</p></li>
            <li><address className="footer-list-item">Indrapuri , Bhopal</address></li>
          </ul>

          <ul className="footer-list">
            <li><p className="footer-list-title">Opening Hours</p></li>
            <li><p className="footer-list-item">Monday-Friday: 08:00-22:00</p></li>
            <li><p className="footer-list-item">Tuesday 4PM: Till Mid Night</p></li>
            <li><p className="footer-list-item">Saturday: 10:00-16:00</p></li>
          </ul>

          <form action="" className="footer-form">
            <p className="footer-list-title">Book a Table</p>
            <div className="input-wrapper">
              <input type="text" name="full_name" required placeholder="Your Name" aria-label="Your Name" className="input-field" />
              <input type="email" name="email_address" required placeholder="Email" aria-label="Email" className="input-field" />
            </div>
            <div className="input-wrapper">
              <select name="total_person" aria-label="Total person" className="input-field">
                <option value="person">Person</option>
                <option value="2 person">2 Person</option>
                <option value="3 person">3 Person</option>
                <option value="4 person">4 Person</option>
                <option value="5 person">5 Person</option>
              </select>
              <input type="date" name="booking_date" aria-label="Reservation date" className="input-field" />
            </div>
            <textarea name="message" required placeholder="Message" aria-label="Message" className="input-field"></textarea>
            <button type="submit" className="btn">Book a Table</button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p className="copyright-text">
            &copy; 2025 <a href="#" className="copyright-link">Snakkr</a> All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};


// --- MAIN APP ---

function Main() {
  return (
    <div className="App" id="top">
      <Header />
      <main>
        <article>
          <Hero />
          <PromoSection />
          <About />
          <FoodMenu />
          <CTA />
          <Delivery />
          <Testimonials />
          <Banner />
          <Blog />
        </article>
      </main>
      <Footer />
      <a href="#top" className="back-top-btn" aria-label="Back to top">
        <IoChevronUp />
      </a>
    </div>
  );
}

export default Main;