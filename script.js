
document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // NAVIGASI MENU
    // =========================
    const navLinks = document.querySelectorAll(
        'nav a[href^="#"], .nav-links a[href^="#"]'
    );

    navLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });


    // =========================
    // LINK INSTAGRAM DAN TIKTOK
    // =========================
    document.querySelectorAll(".social-links a").forEach(function (link) {
        link.addEventListener("click", function (event) {
            const url = link.getAttribute("href");

            if (!url || url === "#") {
                event.preventDefault();
                alert("Link media sosial belum diisi!");
            }
        });
    });


    // =========================
    // GALERI FOTO POP-UP
    // =========================
    const galleryImages = document.querySelectorAll(
        ".gallery-item img"
    );

    if (galleryImages.length > 0) {
        const lightbox = document.createElement("div");

        lightbox.id = "gallery-lightbox";

        Object.assign(lightbox.style, {
            display: "none",
            position: "fixed",
            inset: "0",
            background: "rgba(0, 0, 0, 0.82)",
            zIndex: "9999",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
            cursor: "pointer"
        });

        const preview = document.createElement("img");

        Object.assign(preview.style, {
            maxWidth: "90%",
            maxHeight: "85vh",
            width: "auto",
            height: "auto",
            objectFit: "contain",
            borderRadius: "10px",
            boxShadow: "0 0 30px rgba(0,0,0,0.4)"
        });

        lightbox.appendChild(preview);
        document.body.appendChild(lightbox);

        galleryImages.forEach(function (img) {
            img.style.cursor = "pointer";

            img.addEventListener("click", function () {
                preview.src = img.src;
                preview.alt = img.alt;
                lightbox.style.display = "flex";
                document.body.style.overflow = "hidden";
            });
        });

        lightbox.addEventListener("click", function () {
            lightbox.style.display = "none";
            preview.src = "";
            document.body.style.overflow = "";
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                lightbox.style.display = "none";
                preview.src = "";
                document.body.style.overflow = "";
            }
        });
    }


    // =========================
    // PEMUTAR AUDIO PLAYLIST
    // =========================
    const playButtons = document.querySelectorAll(".play-track");

    if (playButtons.length > 0) {
        const audio = new Audio();
        let currentButton = null;

        playButtons.forEach(function (button) {
            button.addEventListener("click", async function () {
                const source = button.dataset.src;

                if (!source) {
                    alert("Lokasi file audio belum diisi!");
                    return;
                }

                if (currentButton === button && !audio.paused) {
                    audio.pause();
                    button.textContent = "PLAY";
                    return;
                }

                if (currentButton) {
                    currentButton.textContent = "PLAY";
                }

                if (audio.src !== new URL(source, document.baseURI).href) {
                    audio.src = source;
                }

                currentButton = button;
                button.textContent = "LOADING";

                try {
                    await audio.play();
                    button.textContent = "PAUSE";
                } catch (error) {
                    button.textContent = "PLAY";
                    alert("Audio gagal diputar. Periksa nama dan lokasi file MP3.");
                }
            });
        });

        audio.addEventListener("ended", function () {
            if (currentButton) {
                currentButton.textContent = "PLAY";
                currentButton = null;
            }
        });

        audio.addEventListener("pause", function () {
            if (currentButton && audio.ended) {
                currentButton.textContent = "PLAY";
                currentButton = null;
            }
        });
    }

});
