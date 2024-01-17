import img1 from '../img/instagram/inf1.jpg';
import img2 from '../img/instagram/inf2.jpg';
import img3 from '../img/instagram/inf3.jpg';
import img4 from '../img/instagram/inf4.jpg';
import img5 from '../img/instagram/inf5.jpg';
import img6 from '../img/instagram/inf6.jpg';
import img7 from '../img/instagram/inf7.png';
import img8 from '../img/instagram/inf8.png';
import img9 from '../img/instagram/inf9.png';
import img10 from '../img/instagram/inf10.jpg';
import img11 from '../img/instagram/inf11.jpg';
import img12 from '../img/instagram/inf12.jpg';
import bg from '../img/hero/repuestos.jpg';
import bg2 from '../img/hero/maquinaria.jpg';
import bg3 from '../img/hero/compras.jpg';

import React, { useState } from 'react';
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption,
} from 'reactstrap';

const items = [
    {
        src: bg2,
      
    },
    {
        src: bg,
        
    },
    {
        src: bg3
        
    },
];


function Usrindex(args) {

    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    };

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    };

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    };

    const slides = items.map((item) => {
        return (
            <CarouselItem
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
                key={item.src}
            >
                <img src={item.src} alt={item.altText} />
                <CarouselCaption
                    captionText={item.caption}
                    captionHeader={item.caption}
                />
            </CarouselItem>
        );
    });

    const Redir_Maq = () => {
        var fit = "Maquinaria"
        window.location.href = "/Catalogofil/" + fit
    }
    const Redir_Rep = () => {
        var fit = "Repuesto"
        window.location.href = "/Catalogofil/" + fit
    }



    return (



        <div>

            <Carousel
                activeIndex={activeIndex}
                next={next}
                previous={previous}
                {...args}
            >

                <CarouselIndicators
                    items={items}
                    activeIndex={activeIndex}
                    onClickHandler={goToIndex}
                />
                {slides}
                <CarouselControl
                    direction="prev"
                    directionText="Previous"
                    onClickHandler={previous}
                />
                <CarouselControl
                    direction="next"
                    directionText="Next"
                    onClickHandler={next}
                />

            </Carousel>

     
            <section class="latest spad">
                <div class="container">

                    <div class="col-lg-12">
                        <div class="section-title">
                            <span>Nuestros Productos</span>
                            <h2>MAQUINARIAS</h2>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-lg-4 col-md-6 col-sm-6">
                            <div class="blog__item">
                                <div class="blog__item__pic set-bg" data-setbg="img/blog/blog-1.jpg"></div>
                                <div class="blog__item__text">
                                    <span><img src={img7} alt="" /> 16 Sep 2023</span>
                                    <h5>Máquina Industrial Cosedora de Sacos Yao Han</h5>
                                    
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-6 col-sm-6">
                            <div class="blog__item">
                                <div class="blog__item__pic set-bg" data-setbg="img/blog/blog-2.jpg"></div>
                                <div class="blog__item__text">
                                    <span><img src={img8} alt="" /> 21 Sep 2023</span>
                                    <h5>Máquina de Coser Doméstica Brother de 37 Puntadas</h5>
                                    
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-6 col-sm-6">
                            <div class="blog__item">
                                <div class="blog__item__pic set-bg" data-setbg="img/blog/blog-3.jpg"></div>
                                <div class="blog__item__text">
                                    <span><img src={img9} alt="" /> 28 Sep 2023</span>
                                    <h5>Máquina Bordadora Semi Industrial Happy 7 Agujas</h5>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <br /><br />
                    <div class="col-lg-12">
                        <div class="section-title">
                            <button class="site-btn" onClick={() => Redir_Maq()} >VER SIMILARES</button>
                        </div>
                    </div>
                </div>
            </section>


            <section class="latest spad">
                <div class="container">

                    <div class="col-lg-12">
                        <div class="section-title">
                            <span>Nuestros Productos</span>
                            <h2>REPUESTOS</h2>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-lg-4 col-md-6 col-sm-6">
                            <div class="blog__item">
                                <div class="blog__item__pic set-bg" data-setbg="img/blog/blog-1.jpg"></div>
                                <div class="blog__item__text">
                                    <span><img src={img10} alt="" /> 01 Sep 2023</span>
                                    <h5> Doblador de agujas curvadas LLC00560 looper</h5>

                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-6 col-sm-6">
                            <div class="blog__item">
                                <div class="blog__item__pic set-bg" data-setbg="img/blog/blog-2.jpg"></div>
                                <div class="blog__item__text">
                                    <span><img src={img11} alt="" /> 12 Sep 2023</span>
                                    <h5>Piezas de máquinas de coser domésticas prensatelas 5613 punto</h5>

                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-6 col-sm-6">
                            <div class="blog__item">
                                <div class="blog__item__pic set-bg" data-setbg="img/blog/blog-3.jpg"></div>
                                <div class="blog__item__text">
                                    <span><img src={img12} alt="" /> 08 Sep 2023</span>
                                    <h5>Yeonho YDT200</h5>

                                </div>
                            </div>
                        </div>
                    </div>
                    <br /><br />
                    <div class="col-lg-12">
                        <div class="section-title">
                            <button class="site-btn" onClick={() => Redir_Rep()} >VER SIMILARES</button>
                        </div>
                    </div>
                </div>
            </section>





            <section class="instagram spad">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-8">
                            <div class="instagram__pic">
                                <div class="instagram__pic__item set-bg"><img src={img1} /></div>
                                <div class="instagram__pic__item set-bg"><img src={img2} /></div>
                                <div class="instagram__pic__item set-bg"><img src={img3} /></div>
                                <div class="instagram__pic__item set-bg"><img src={img4} /></div>
                                <div class="instagram__pic__item set-bg"><img src={img5} /></div>
                                <div class="instagram__pic__item set-bg"><img src={img6} /></div>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="instagram__text">
                                <h2>Información</h2>
                                <p>Danitex, expertos en proveer maquinarias y repuestos textiles e innovadores de alta calidad que satisfagan 
                                    las necesidades de nuestros clientes, brindando siempre un servicio de excelencia</p>
                                <h3>#DANITEX</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section><br /><br /><br />
        </div>
    )
}

export default Usrindex




