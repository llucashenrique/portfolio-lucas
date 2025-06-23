
// TELEFONE MASCARA
const telefoneInput = document.getElementById('telefone');
if (telefoneInput) {
    telefoneInput.addEventListener('input', function () {
        let telefone = telefoneInput.value.replace(/\D/g, '');
        telefone = telefone.replace(/^(\d{2})(\d)/g, '($1) $2');
        telefone = telefone.replace(/(\d{5})(\d{1,4})$/, '$1-$2');
        telefoneInput.value = telefone;
    });
}

// SPOTLIGHT
const spotlight = document.getElementById("spotlight");
if (spotlight) {
    document.addEventListener("pointermove", (e) => {
        const x = e.clientX + "px";
        const y = e.clientY + "px";
        spotlight.style.setProperty("--x", x);
        spotlight.style.setProperty("--y", y);
    });
}

// CV OPTIONS
function toggleOptions() {
    const options = document.getElementById('cv-options');
    options.classList.toggle('hidden');
}

function closeOptions() {
    const options = document.getElementById('cv-options');
    options.classList.add('hidden');
}

document.addEventListener('click', function (event) {
    const wrapper = document.querySelector('.cv-wrapper');
    if (wrapper && !wrapper.contains(event.target)) {
        const options = document.getElementById('cv-options');
        if (options) options.classList.add('hidden');
    }
});

// FORM CONTATO
const form = document.getElementById('form-contato');
const popup = document.getElementById('popup');
const popupMsg = document.getElementById('popup-msg');

if (form && popup && popupMsg) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        popup.classList.remove('hidden');
        popup.classList.add('show');
        popupMsg.textContent = 'Enviando...';

        const formData = new FormData(form);
        fetch(form.action, {
            method: 'POST',
            body: formData,
        })
            .then(response => {
                popupMsg.textContent = 'Mensagem enviada com sucesso!';
                form.reset();

                setTimeout(() => {
                    popup.classList.remove('show');
                    popup.classList.add('hidden');
                }, 4000);
            })
            .catch(error => {
                popupMsg.textContent = 'Erro ao enviar mensagem.';
            });
    });
}

// BOTAO TOPO
const btnTopo = document.querySelector('.btn-topo');
if (btnTopo) {
    window.addEventListener('scroll', () => {
        btnTopo.style.display = window.scrollY > 300 ? 'block' : 'none';
    });
}

// TRADUCAO
let currentLang = 'pt';

document.addEventListener("DOMContentLoaded", function () {
    const mainCheckbox = document.getElementById('checkbox');
    const mobileCheckbox = document.getElementById('checkbox-mobile');

    function handleLanguageChange(checked) {
        currentLang = checked ? 'en' : 'pt';
        translateTo(currentLang);

        if (mainCheckbox) mainCheckbox.checked = checked;
        if (mobileCheckbox) mobileCheckbox.checked = checked;
    }

    if (mainCheckbox) {
        mainCheckbox.addEventListener('change', () => {
            handleLanguageChange(mainCheckbox.checked);
        });
    }

    if (mobileCheckbox) {
        mobileCheckbox.addEventListener('change', () => {
            handleLanguageChange(mobileCheckbox.checked);
        });
    }

    translateTo(currentLang);
});

function translateTo(lang) {
    const elements = document.querySelectorAll('[data-pt][data-en]');
    elements.forEach(el => {
        const translation = el.getAttribute(`data-${lang}`);
        if (!translation) return;

        if (translation.includes('<span')) {
            el.innerHTML = translation;
        } else if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.placeholder = translation;
        } else {
            el.textContent = translation;
        }
    });
}

// MENU MOBILE
const btnAbrir = document.querySelector('.btn-abrir-menu');
const menuMobile = document.querySelector('.menu-mobile');
const overlay = document.querySelector('.overlay-menu');
const btnFechar = document.querySelector('.btn-fechar a');

if (btnAbrir) {
    btnAbrir.addEventListener('click', () => {
        menuMobile.classList.add('abrir-menu');
        overlay.classList.add('ativo');
    });
}

if (overlay) {
    overlay.addEventListener('click', () => {
        menuMobile.classList.remove('abrir-menu');
        overlay.classList.remove('ativo');
    });
}

if (btnFechar) {
    btnFechar.addEventListener('click', (e) => {
        e.preventDefault();
        menuMobile.classList.remove('abrir-menu');
        overlay.classList.remove('ativo');
    });



    const form = document.getElementById('form-contato');
    const popup = document.getElementById('popup');
    const popupMsg = document.getElementById('popup-message');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const lang = typeof currentLang !== 'undefined' ? currentLang : 'pt';
        const sending = lang === 'pt' ? 'Enviando...' : 'Sending...';
        const success = lang === 'pt' ? 'Mensagem enviada com sucesso!' : 'Message sent successfully!';
        const error = lang === 'pt' ? 'Erro ao enviar mensagem.' : 'Failed to send message.';

        showPopup(sending);

        const formData = new FormData(form);

        fetch(form.action, {
            method: "POST",
            body: formData,
            headers: { 'Accept': 'application/json' }
        }).then(response => {
            if (response.ok) {
                showPopup(success);
                form.reset();
            } else {
                showPopup(error);
            }
        }).catch(() => {
            showPopup(error);
        });
    });

    // POP PUP

    function showPopup(message) {
        popupMsg.textContent = message;
        popup.classList.remove('hidden');
        popup.classList.add('show');

        setTimeout(() => {
            popup.classList.remove('show');
            popup.classList.add('hidden');
        }, 3000);
    }

    // SWIPE
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', function (e) {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    document.addEventListener('touchend', function (e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipeGesture();
    }, false);

    function handleSwipeGesture() {
        const swipeDistance = touchEndX - touchStartX;

        if (swipeDistance < -80) {
            // Swipe da direita para a esquerda: abrir menu com delay
            setTimeout(() => {
                menuMobile.classList.add('abrir-menu');
                overlay.classList.add('ativo');
            }, 100); // delay de 100ms
        } else if (swipeDistance > 80) {
            // Swipe da esquerda para a direita: fechar menu
            menuMobile.classList.remove('abrir-menu');
            overlay.classList.remove('ativo');
        }
    }




}


