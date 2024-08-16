import React from 'react';
import '../CSS/Home.css'; // Ensure this CSS file includes the updated styles
import image2 from "../images/2.jpeg";
import image3 from "../images/3.jpeg";
import image4 from "../images/4.jpeg";

const Home = () => {
  return (
    <div className="home-container">
      <header className="hero-section">
        <div className="hero-text">
          <h1>أصالة إسكان</h1>
          <p>رائدة في مجال البناء والتشييد بالمغرب</p>
        </div>
      </header>

      <section className="about-us">
        <h2>عن شركتنا</h2>
        <p>
          تأسست شركة أصالة إسكان لتلبية احتياجات السوق المغربي في مجال البناء والتشييد. نقدم خدماتنا بأعلى جودة مع الالتزام بالمواعيد والمواصفات الفنية.
          نحن نعمل على مشاريع متنوعة تشمل البناء السكني والتجاري، ونسعى دائمًا لتحقيق التميز والابتكار في كل ما نقوم به.
        </p>
      </section>

      <section className="projects-gallery">
        <h2>معرض مشاريعنا</h2>
        <div id="mz-gallery-container">
          <div id="mz-gallery">
            <figure>
              <img src={image2} alt="Project 1" />
              <figcaption>Project 1</figcaption>
            </figure>
            <figure>
              <img src={image3} alt="Project 2" />
              <figcaption>Project 2</figcaption>
            </figure>
            <figure>
              <img src={image4} alt="Project 3" />
              <figcaption>Project 3</figcaption>
            </figure>
            {/* Add more figures as needed */}
          </div>
        </div>
      </section>

      <section className="contact-us">
        <h2>تواصل معنا</h2>
        <p>
          لمزيد من المعلومات أو الاستفسارات، لا تتردد في الاتصال بنا عبر الهاتف أو البريد الإلكتروني.
        </p>
        <p>الهاتف: +212 123-456-789</p>
        <p>البريد الإلكتروني: contact@assalaiskane.com</p>
      </section>
    </div>
  );
};

export default Home;
