class Slide {
    constructor(containerSelector, trackSelector, itemWidth, opt = {}) {
        this.container = document.querySelector(containerSelector);
        this.track = document.querySelector(trackSelector);
        this.itemWidth = itemWidth;
        this.children = this.track.children;

        this.options = {
            autoSlide: opt.autoSlide || true,
            autoSpeed: opt.autoSpeed || 2500,
        }

        this.idx = 0;
        this.autoSlide = null;

        this.isDragging = false;
        this.isSliding = false;
        this.isBtnWorking = false;
        this.movedX = 0;
        this.prevX = 0;

        this.progressBar = null;

        this.init();
        this.setEventListeners();
    }

    init() {
        this.initStyle();
        
        if (this.options.autoSlide) {
            this.createClones();
            this.setAutoSlide();
        }
    }

    initStyle() {
        this.track.style.transform = "translateX(0px)";
        if (this.options.autoSlide) {
            const items = Array.from(this.track.children).filter(child => !child.classList.contains('clone'));
            this.track.style.left = `${this.itemWidth * items.length * -1}px`;
        }
    }

    createClones() {
        const nodes = Array.from(this.track.children);

        nodes.forEach(node => {
            const clone = node.cloneNode(true);
            clone.classList.add('clone');
            this.track.append(clone);
        });

        nodes.reverse().forEach(node => {
            const clone = node.cloneNode(true);
            clone.classList.add('clone');
            this.track.prepend(clone);
        });
    }

    setEventListeners() {
        $(this.container).on('mousedown touchstart', this.down.bind(this));
        $(window).on('mousemove touchmove', this.move.bind(this));
        $(window).on('mouseup touchend', this.up.bind(this));
    }

    down() {
        if (this.isSliding) {
            return;
        }

        this.isDragging = true;
        this.track.style.transition = '0s';
        this.clearAutoSlide();
    }

    move(e) {
        if (!this.isDragging) {
            return;
        }

        this.dragg(e);
    }

    up() {
        if (!this.isDragging || this.movedX === 0) {
            return;
        }

        if (this.movedX < 0) {
            this.nextSlide();
        } else {
            this.prevSlide();
        }

        this.isDragging = false;
        this.movedX = 0;
        this.prevX = 0;
    }

    dragg(e) {
        const movementX = this.getMovement(e);
        const currentX = parseInt(this.track.style.transform.replace(/[^\d-.]/g, ''))
        this.movedX += movementX;
        this.track.style.transform = `translateX(${movementX + currentX}px)`;
    }

    getMovement(e) {
        const clientX = e.originalEvent.clientX || e.originalEvent.touches[0].clientX;

        let movement = 0;
        if (this.prevX !== 0) {
            movement = parseInt(clientX - this.prevX);
        }
        
        this.prevX = clientX;
        return movement;
    }

    slide() {
        if (this.isSliding) {
            return;
        }

        this.isSliding = true;
        setTimeout(() => { this.isSliding = false; }, 1000)

        this.track.style.transition = '1s';
        this.track.style.transform = `translateX(${this.itemWidth * this.idx * -1}px)`;

        const orgLen = this.children.length / 3;
        this.renderProgressBar(this.idx / orgLen);

        if (!this.options.autoSlide) {
            return;
        }

        if (orgLen <= this.idx) {
            this.idx = 0;
        }

        if (this.idx <= -3) {
            this.idx = 2;
        }

        $(this.track).one("transitionend", () => {
            this.track.style.transition = '0s';
            this.track.style.transform = `translateX(-${this.itemWidth * this.idx}px)`;
        });
        
        this.renderProgressBar(this.idx / orgLen);
    }

    nextSlide() {
        this.idx++;
        this.slide();
    }

    prevSlide() {
        this.idx--;
        this.slide();
    }

    setAutoSlide() {
        this.autoSlide = setInterval(() => {
            this.idx++;
            this.slide();

        }, this.options.autoSpeed);
    }

    clearAutoSlide() {
        clearInterval(this.autoSlide);
    }

    setButton(prev, next) {
        document.querySelector(prev).addEventListener('click', () => {
            if (this.isBtnWorking) {
                return;
            }
            this.isBtnWorking = true;

            this.clearAutoSlide();
            this.prevSlide();
            setTimeout(() => {
                this.setAutoSlide();
                this.isBtnWorking = false;
            });
        });
        document.querySelector(next).addEventListener('click', () => {
            if (this.isBtnWorking) {
                return;
            }
            this.isBtnWorking = true;

            this.clearAutoSlide();
            this.nextSlide();
            setTimeout(() => {
                this.setAutoSlide();
                this.isBtnWorking = false;
            }, 1000);
        });
    }

    setProgressBar(selector) {
        this.progressBar = document.querySelector(selector);
    }

    renderProgressBar(ratio) {
        this.progressBar.style.width = `${ratio*100}%`;
    }
}
    
const slide1 = new Slide("#main_feature .feature-cgroup[data-menu='nav1'] .item-container", "#main_feature .feature-cgroup[data-menu='nav1'] .item-track", 420);
slide1.setButton("#main_feature .feature-cgroup[data-menu='nav1'] .left .btn-group button.prev", "#main_feature .feature-cgroup[data-menu='nav1'] .left .btn-group button.next");
slide1.setProgressBar("#main_feature .feature-cgroup[data-menu='nav1'] .right .progress-bar .bar");

const slide2 = new Slide("#main_feature .feature-cgroup[data-menu='nav2'] .item-container", "#main_feature .feature-cgroup[data-menu='nav2'] .item-track", 420);
slide2.setButton("#main_feature .feature-cgroup[data-menu='nav2'] .left .btn-group button.prev", "#main_feature .feature-cgroup[data-menu='nav2'] .left .btn-group button.next");
slide2.setProgressBar("#main_feature .feature-cgroup[data-menu='nav2'] .right .progress-bar .bar");

const slide3 = new Slide("#main_feature .feature-cgroup[data-menu='nav3'] .item-container", "#main_feature .feature-cgroup[data-menu='nav3'] .item-track", 420);
slide3.setButton("#main_feature .feature-cgroup[data-menu='nav3'] .left .btn-group button.prev", "#main_feature .feature-cgroup[data-menu='nav3'] .left .btn-group button.next");
slide3.setProgressBar("#main_feature .feature-cgroup[data-menu='nav3'] .right .progress-bar .bar");

const slide4 = new Slide("#main_feature .feature-cgroup[data-menu='nav4'] .item-container", "#main_feature .feature-cgroup[data-menu='nav4'] .item-track", 420);
slide4.setButton("#main_feature .feature-cgroup[data-menu='nav4'] .left .btn-group button.prev", "#main_feature .feature-cgroup[data-menu='nav4'] .left .btn-group button.next");
slide4.setProgressBar("#main_feature .feature-cgroup[data-menu='nav4'] .right .progress-bar .bar");

const mobileMedia = window.matchMedia("screen and (max-width: 480px)");
function checkMediaQuery() {
    if (mobileMedia.matches) {
        slide1.itemWidth = 280;
        slide1.initStyle();
        slide1.slide();
        slide1.idx = 0;
        slide2.itemWidth = 280;
        slide2.initStyle();
        slide2.slide();
        slide2.idx = 0;
        slide3.itemWidth = 280;
        slide3.initStyle();
        slide3.slide();
        slide3.idx = 0;
        slide4.itemWidth = 280;
        slide4.initStyle();
        slide4.slide();
        slide4.idx = 0;
    } else {
        slide1.itemWidth = 420;
        slide1.initStyle();
        slide1.slide();
        slide1.idx = 0;
        slide2.itemWidth = 420;
        slide2.initStyle();
        slide2.slide();
        slide2.idx = 0;
        slide3.itemWidth = 420;
        slide3.initStyle();
        slide3.slide();
        slide3.idx = 0;
        slide4.itemWidth = 420;
        slide4.initStyle();
        slide4.slide();
        slide4.idx = 0;
    }
}

checkMediaQuery();
mobileMedia.addEventListener('change', checkMediaQuery);

