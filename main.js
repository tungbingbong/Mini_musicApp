/**
 * 1. Render Song
 * 2. Scroll top
 * 3. Play / Pause/ Seek
 * 4. CD rotate
 * 5. Next / prev
 * 6. Random
 * 7. Next / Repeat when ended
 * 8. Active song
 * 9. Scroll active song into view // Nghiã là khi active song đang đc chạy thì bó phải view trc màn hình, tránh ẩn
 * 10. Play song when click
 * Bonus: Save keys include: button 
 */

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = 'CODE_MUSIC_PLAYER_SETTINGS';

const cd = $('.cd');
const playlist = $('.playlist');
const heading = $('header h2');
const cdThumb = $('.cd-thumb');
const cdSoundWave = $('.cd-soundwave');
const audio = $('#audio');
const btnPlay = $('.btn-toggle-play');
const player = $('.player');
const progress = $('#progress');
const btnNext = $('.btn-next');
const btnPrev = $('.btn-prev');
const btnRepeat = $('.btn-repeat');
const btnRandom = $('.btn-random');
const time_start = $('.control_time--left');
const time_count = $('.control_time--right');

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRepeat: false,
    isRandom: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    songs: [
        {
            name: 'POP - (Nayeon)',
            singer: 'Nayeon(TWICE)',
            path: './assets/songs/Pop.mp3',
            img: './assets/images/Nayeon.jpeg'
        },
        {
            name: 'Gee - (SNSD)',
            singer: 'SNSD',
            path: './assets/songs/Gee.mp3',
            img: './assets/images/snsd.jpeg'
        },
        {
            name: 'HotPink - (EXID)',
            singer: 'EXID',
            path: './assets/songs/HotPink.mp3',
            img: './assets/images/EXID.jpeg'
        },
        {
            name: 'Solo - (Jennie)',
            singer: 'Jennie(BlackPink)',
            path: './assets/songs/Solo.mp3',
            img: './assets/images/Jennie.jpeg'
        },
        {
            name: 'Egotistic - (MAMAMOO)',
            singer: 'MAMAMOO',
            path: './assets/songs/Egotistic.mp3',
            img: './assets/images/Mamamoo.jpeg'
        },
        {
            name: 'Roly Poly (T-ARA)',
            singer: 'T-ARA',
            path: './assets/songs/RolyPoly.mp3',
            img: './assets/images/T-ara.jpeg'
        },
        {
            name: 'Cry Cry - (T-ARA)',
            singer: 'T-ARA',
            path: './assets/songs/CryCry.mp3',
            img: './assets/images/T-ara.jpeg'
        },
        {
            name: 'Dun Dun Dance - (Oh My Girl)',
            singer: 'Oh My Girl',
            path: './assets/songs/DunDunDance.mp3',
            img: './assets/images/OhMyGirl.jpeg'
        },
        {
            name: 'Expect - (GIRL\'s DAY)',
            singer: 'GIRL\'s DAY',
            path: './assets/songs/Expect.mp3',
            img: './assets/images/Girlsday.jpeg'
        },
        {
            name: 'Heart Shaker - (TWICE)',
            singer: 'TWICE',
            path: './assets/songs/HeartShaker.mp3',
            img: './assets/images/Twice.jpeg'
        },
        {
            name: 'Hush - (Miss A)',
            singer: 'Miss A',
            path: './assets/songs/Hush.mp3',
            img: './assets/images/MissA.jpeg'
        },
        {
            name: 'I\'m So Hot - (MOMOLAND)',
            singer: 'MOMOLAND',
            path: './assets/songs/ImSoHot.mp3',
            img: './assets/images/Momoland.jpeg'
        },
        {
            name: 'MAGO - (GFRIEND)',
            singer: 'GFRIEND',
            path: './assets/songs/Mago.mp3',
            img: './assets/images/G-friend.jpeg'
        },
        {
            name: 'Monster - (IRENE & SEULGI)',
            singer: 'IRENE & SEULGI - (Red Velvet)',
            path: './assets/songs/Monster.mp3',
            img: './assets/images/Seulgi&Irene.jpeg'
        },
        {
            name: 'Mr.Chu-(Apink)',
            singer: 'Apink',
            path: './assets/songs/MrChu.mp3',
            img: './assets/images/Apink.jpeg'
        },
        {
            name: 'Oh! - (Girl\'S Generation)',
            singer: 'Girl\'s Generation',
            path: './assets/songs/Oh.mp3',
            img: './assets/images/snsd.jpeg'
        },
        {
            name: 'On The Ground - (ROSÉ)',
            singer: 'ROSÉ (BlackPink)',
            path: './assets/songs/OnTheGround.mp3',
            img: './assets/images/Róse.jpeg'
        },
        {
            name: 'Really Bad Boy - (Red Velvet)',
            singer: 'Red Velvet',
            path: './assets/songs/ReallyBadBoy.mp3',
            img: './assets/images/RedVelvet.jpeg'
        },
        {
            name: 'Sexy Love - (T-ARA)',
            singer: 'T-ARA',
            path: './assets/songs/SexyLove.mp3',
            img: './assets/images/T-ara.jpeg'
        },
        {
            name: 'Shut Down - (BlackPink)',
            singer: 'BlackPink',
            path: './assets/songs/ShutDown.mp3',
            img: './assets/images/BlackPink.jpeg'
        },
        {
            name: 'Sugar Free - (-ARA)',
            singer: 'T-ARA',
            path: './assets/songs/SugarFree.mp3',
            img: './assets/images/T-ara.jpeg'
        },
        {
            name: 'TOMBOY - ((G)I-DLE)',
            singer: '(G)I-DLE',
            path: './assets/songs/Tomboy.mp3',
            img: './assets/images/G-Idle.jpeg'
        },
        {
            name: 'Touch my body - (SISTAR)',
            singer: 'SISTAR',
            path: './assets/songs/TouchMyBody.mp3',
            img: './assets/images/Sistar.jpeg'
        },
        {
            name: 'UP AND DOWN - (EXID)',
            singer: 'EXID',
            path: './assets/songs/UpAndDown.mp3',
            img: './assets/images/EXID.jpeg'
        },
        {
            name: 'WANNABE - (ITZY)',
            singer: 'ITZY',
            path: './assets/songs/Wannabe.mp3',
            img: './assets/images/Itzy.jpeg'
        },
        {
            name: 'DALLA DALLA - (ITZY)',
            singer: 'ITZY',
            path: './assets/songs/DallaDalla.mp3',
            img: './assets/images/Itzy.jpeg'
        },
    ],
    setConfig: function (key, value) {
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
    },
    loadConfig: function () {
        this.isRandom = this.config.isRandom;
        this.isRepeat = this.config.isRepeat;
    },
    renderSongList: function () {
        const htmls = this.songs.map((song, index) => {
            return `<div class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
                            <div class="thumb" style="background-image: url('${song.img}')"></div>
                            <div class="body">
                                <h3 class="title">${song.name}</h3>
                                <p class="author">${song.singer}</p>
                            </div>
                            <div class="equalizer-container">
                                <ol class="equalizer-column">
                                    <li class="colour-bar"></li>
                                </ol>
                                <ol class="equalizer-column">
                                    <li class="colour-bar"></li>
                                </ol>
                                <ol class="equalizer-column">
                                    <li class="colour-bar"></li>
                                </ol>
                                <ol class="equalizer-column">
                                    <li class="colour-bar"></li>
                                </ol>
                                <ol class="equalizer-column">
                                    <li class="colour-bar"></li>
                                </ol>
                            </div>
                            <div class="option">
                                <i class="fas fa-ellipsis-h"></i>
                            </div>
                    </div>`;
        });

        playlist.innerHTML = htmls.join('\n');

    },
    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex];
            }
        })
    },
    loadCurrentSong: function () {
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.img}')`;
        audio.src = this.currentSong.path;
    },
    handleEvents: function () {
        const _this = this;
        const cdWidth = cd.offsetWidth;

        // Xử lý khi bài hát chạy CD rotate and stop
        const cdThumbAnimate = cdThumb.animate([
            { transform: 'rotate(360deg)' }
        ], {
            duration: 10000, // quay 10s
            iterations: Infinity,
        })

        cdThumbAnimate.pause();

        // Xử lý khi cuộn thanh list danh sách lên thì CD phóng to hoặc thu nhỏ 
        document.onscroll = function (e) {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollTop;

            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
            cd.style.opacity = newCdWidth / cdWidth;
            cdSoundWave.style.opacity = newCdWidth / cdWidth;
        }

        // Xử lý lắng nghe hành vi users click vào button play songs
        btnPlay.onclick = () => {
            if (_this.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
        }

        // Xử lý event khi song đang pause, playBtn sẽ lắng nghe hành động click tiếp theo ngay lập tức
        audio.onplay = () => {
            _this.isPlaying = true;
            player.classList.add('playing');
            cdSoundWave.classList.add('active');
            audio.play();
            cdThumbAnimate.play();
            this.scrollToActiveSong();
        }

        // Xử lý event khi song đang playing, playBtn sẽ lắng nghe hành động click tiếp theo ngay lập tức
        audio.onpause = () => {
            _this.isPlaying = false;
            player.classList.remove('playing');
            cdSoundWave.classList.remove('active');
            audio.pause();
            cdThumbAnimate.pause();
        }

        // Thanh progress(thanh tiến độ bài hát) thay đổi(tua)
        audio.ontimeupdate = () => {
            if (audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100);
                progress.value = progressPercent;
                // css cho thanh progress khi kéo về vị trí current time sẽ có background
                progress.style.background = 'linear-gradient(to right, #00cfff 0%, #00cfff ' + progressPercent + '%, #d3d3d3 ' + progressPercent + '%, #d3d3d3 100%)';

                // Time Count of Audio Current Time
                var e = Math.floor(audio.currentTime);
                var d = e % 60; // number of second
                var b = Math.floor(e / 60); // number of minutes
                if (d < 10) {
                    var c = 0;
                } else {
                    c = "";
                }
                time_start.textContent = '0' + b + ":" + c + d;

                // Time Count of Audio Duration
                var ee = Math.floor(audio.duration);
                var dd = ee % 60; //number of second
                var bb = Math.floor(ee / 60); //number of minutes
                if (dd < 10) {
                    var cc = 0;
                } else {
                    cc = "";
                }

                time_count.textContent = '0' + bb + ":" + cc + dd;
        }

        if (!audio.duration) {
            time_start.textContent = '-' + ":" + "-";
            time_count.textContent = '-' + ":" + "-";
        }
    }

        // Xử lý khi user kéo thanh tua bài hát
        progress.oninput = function (e) {
        const seekTime = (audio.duration / 100) * e.target.value;
        audio.currentTime = seekTime;

    };

    // Xử lý lắng nghe hành động user click vào nút next(tiến) bài hát
    btnNext.onclick = () => {
        if (_this.isRandom) {
            _this.playRandomSong();
        } else {
            _this.nextSong();
        }
        audio.play();
        _this.renderSongList();
        _this.scrollToActiveSong();
    }

        // Xử lý lắng nghe hành động user click vào nút prev(lùi) bài hát
        btnPrev.onclick = () => {
        if (_this.isRandom) {
            _this.playRandomSong();
        } else {
            _this.prevSong();
        }
        audio.play();
        _this.renderSongList();
        _this.scrollToActiveSong();
    }

        // Xủ lý bật/tắt random songs
        btnRandom.onclick = () => {
        _this.isRandom = !_this.isRandom;
        _this.setConfig('isRandom', _this.isRandom);
        btnRandom.classList.toggle('active', _this.isRandom);
    }

        // Xử lý khi lặp lại một bài hát
        btnRepeat.onclick = () => {
        _this.isRepeat = !_this.isRepeat;
        _this.setConfig('isRepeat', _this.isRepeat);
        btnRepeat.classList.toggle('active', _this.isRepeat);
    }

        // Xử lý bài hát lúc end thì tự động repeat hoặc next bài hát
        audio.onended = () => {
        if (_this.isRepeat) {
            audio.play();
        } else {
            btnNext.click();
        }
    }

        // Lắng nghe hành vi click vào playlist
        playlist.onclick = (e) => {
        const songNode = e.target.closest('.song:not(.active)');
        const optionNode = e.target.closest('.option');

        // Xử lý hành vi click vào phần list bài hát
        if (songNode || optionNode) {
            if (songNode) {
                _this.currentIndex = Number(songNode.dataset.index); // Chú ý khi ta get data-index là dạng chuỗi, cần Number convert
                _this.loadCurrentSong();
                _this.renderSongList();
                audio.play();
            }
            if (optionNode) {
                alert('This function being developed. Sorry bout that!!! ')
            }
        }
    }

    },
    scrollToActiveSong: function() {
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'end'
            });
        }, 100)
    },
    nextSong: function() {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },
    prevSong: function() {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },
    playRandomSong: function() {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * this.songs.length);
        } while (newIndex === this.currentIndex)

        this.currentIndex = newIndex;
        this.loadCurrentSong();
    },
    start: function () {
        // Gán cấu hình từ config vào ứng dụng
        this.loadConfig();

        // Khi start object của chương trình sẽ trả về bài hát hiện tại của currentIndex: app.(tên phương thức)
        this.defineProperties();

        // Render giao diện danh sách các bài hát 
        this.renderSongList();

        // Tải thông tin bài hát đầu tiên khi khởi chạy UI chương trình
        this.loadCurrentSong();

        // Listen and handle all events(DOM Events)
        this.handleEvents();

        // Hiển thị trạng thái ban đầu của button repeat và random khi reload còn giữ nguyên config
        btnRepeat.classList.toggle('active', this.isRepeat);
        btnRandom.classList.toggle('active', this.isRandom);
    }
}
            


app.start();
