// Ano automático no rodapé
document.getElementById('year').textContent = new Date().getFullYear();

// Beautiful Navigation
const navbarToggle = document.getElementById('navbarToggle');
const navbarMenu = document.getElementById('navbarMenu');

navbarToggle.addEventListener('click', () => {
    navbarToggle.classList.toggle('active');
    navbarMenu.classList.toggle('active');
});

// Close menu when clicking on links
navbarMenu.querySelectorAll('.navbar__link').forEach(link => {
    link.addEventListener('click', () => {
        navbarToggle.classList.remove('active');
        navbarMenu.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navbarToggle.contains(e.target) && !navbarMenu.contains(e.target)) {
        navbarToggle.classList.remove('active');
        navbarMenu.classList.remove('active');
    }
});



// Scroll suave para âncoras internas
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
        const id = a.getAttribute('href');
        if (!id || id === '#') return;
        const el = document.querySelector(id);
        if (!el) return;
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// Terminal animado (typewriter)
(function () {
    const el = document.getElementById('terminalBody');
    if (!el) return;
    const lines = [
        { p: "israel@dev:~$", t: " echo \"Construindo a base para me tornar um desenvolvedor completo\"" },
        { p: "israel@dev:~$", t: " skills --focus \"C#, HTML/CSS/JS, Linux\"" },
        { p: "israel@dev:~$", t: " future --vision \"olhos no futuro da tecnologia\"" }
    ];
    let i = 0, j = 0; const speed = 26; // ms por caractere
    const cursor = document.createElement('span'); cursor.className = 'cursor';

    function render() {
        el.innerHTML = '';
        for (let k = 0; k < i; k++) {
            el.innerHTML += `<span class="prompt">${lines[k].p}</span> ${lines[k].t}\n`;
        }
        if (i < lines.length) {
            const typed = lines[i].t.slice(0, j);
            el.innerHTML += `<span class="prompt">${lines[i].p}</span> ${typed}`;
            el.appendChild(cursor);
            el.scrollTop = el.scrollHeight;
        } else {
            el.appendChild(cursor);
        }
    }
    function tick() {
        if (i >= lines.length) { 
            document.getElementById('scrollIndicator').style.display = 'block';
            return; 
        }
        if (j < lines[i].t.length) { j++; render(); setTimeout(tick, speed); }
        else { i++; j = 0; render(); setTimeout(tick, 600); }
    }
    render(); tick();
    
    // Hide scroll button on click
    document.querySelector('.scroll-btn').addEventListener('click', () => {
        document.getElementById('scrollIndicator').style.display = 'none';
    });
})();

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

// Load saved theme from localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    root.classList.toggle('light', savedTheme === 'light');
    themeToggle.textContent = savedTheme === 'light' ? '🌙' : '☀️';
}

themeToggle.addEventListener('click', () => {
    const isLight = root.classList.toggle('light');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    themeToggle.textContent = isLight ? '🌙' : '☀️';
});



// Contact form
const contactForm = document.querySelector('.contact__form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = e.target.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.textContent = 'Enviando...';
        btn.disabled = true;
        
        setTimeout(() => {
            btn.textContent = 'Mensagem Enviada!';
            setTimeout(() => {
                btn.textContent = originalText;
                btn.disabled = false;
                contactForm.reset();
            }, 2000);
        }, 1000);
    });
}

// Scroll reveal animation
const revealElements = document.querySelectorAll('.reveal');
const revealOnScroll = () => {
    revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.75;
        if (isVisible) el.classList.add('active');
    });
};
window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// Interactive Skills
const skillsData = {
    csharp: {
        title: 'C# & .NET',
        description: 'Linguagem principal para desenvolvimento de aplicações desktop e web.',
        code: `// Exemplo: Sistema de Biblioteca
public class Livro
{
    public string Titulo { get; set; }
    public string Autor { get; set; }
    public bool Disponivel { get; set; }
    
    public void Emprestar()
    {
        if (Disponivel)
        {
            Disponivel = false;
            Console.WriteLine($"{Titulo} emprestado!");
        }
    }
}`,
        projects: ['Sistema de Biblioteca', 'Calculadora Avançada']
    },
    web: {
        title: 'Desenvolvimento Web',
        description: 'HTML5, CSS3 e JavaScript para criar interfaces modernas e responsivas.',
        code: `// Exemplo: Animação suave
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.reveal');
    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
            el.classList.add('active');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);`,
        projects: ['Portfolio Pessoal']
    },
    linux: {
        title: 'Linux & Automação',
        description: 'Experiência básica com comandos Linux.',
        code: `#Comandos ja utilizados

htop

creed

clear

ls

cd /home/

cd /cotemig

pwd

mkdir Automação

cd Automação

mkdir DevOps

mkdir IA

mkdir Iot

cd /home/

cd cotemig

cd DevOps

mkdir Ansible

mkdir Terraform

cd Iot

cd /home/cotemig

cd /home/coemig

tree

cd ..

history`,
        projects: ['Nenhum projeto no linux.']
    },
};

const skillCards = document.querySelectorAll('.skill-card');
const skillDetail = document.getElementById('skillDetail');
const skillContent = document.getElementById('skillContent');
const skillClose = document.getElementById('skillClose');

skillCards.forEach(card => {
    card.addEventListener('click', () => {
        const skill = card.dataset.skill;
        const data = skillsData[skill];
        
        skillContent.innerHTML = `
            <h4>${data.title}</h4>
            <p>${data.description}</p>
            <pre><code>${data.code}</code></pre>
            <div style="margin-top: 20px;">
                <strong>Projetos relacionados:</strong>
                <ul style="margin: 8px 0; padding-left: 20px;">
                    ${data.projects.map(p => `<li>${p}</li>`).join('')}
                </ul>
            </div>
        `;
        
        skillDetail.classList.add('active');
        skillDetail.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
});

skillClose.addEventListener('click', () => {
    skillDetail.classList.remove('active');
});

// Project Filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        projectCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.style.display = 'block';
                card.style.animation = 'slideIn 0.3s ease';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Interactive Terminal
const terminalBody = document.getElementById('terminalInteractive');
const terminalInput = document.getElementById('terminalInput');

const commands = {
    help: 'Comandos disponíveis: about, skills, projects, contact, clear, whoami, ls',
    about: 'Israel Gomes Moreira - Desenvolvedor em formação\nEstudante do COTEMIG, focado em C#, Web e Linux',
    skills: 'Principais skills:\n• C# & .NET\n• HTML, CSS, JavaScript\n• Linux & Bash\n• Git/GitHub',
    projects: 'Projetos principais:\n• Sistema de Biblioteca (C#)\n• Calculadora Científica (Web)\n• Scripts de Automação (Linux)',
    contact: 'Entre em contato:\n• Email: israel@exemplo.com\n• LinkedIn: linkedin.com/in/israelgm\n• GitHub: github.com/israelgm',
    whoami: 'israel@portfolio',
    ls: 'skills/  projects/  contact/  about.txt',
    clear: 'CLEAR'
};

function addTerminalLine(content, className = '') {
    const line = document.createElement('div');
    line.className = `terminal-line ${className}`;
    line.innerHTML = content;
    terminalBody.appendChild(line);
    terminalBody.scrollTop = terminalBody.scrollHeight;
}

terminalInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const command = terminalInput.value.trim().toLowerCase();
        
        addTerminalLine(`<span class="prompt">israel@portfolio:~$</span> <span class="command">${command}</span>`);
        
        if (commands[command]) {
            if (command === 'clear') {
                terminalBody.innerHTML = '<div class="terminal-line"><span class="prompt">israel@portfolio:~$</span> <span class="welcome">Terminal limpo!</span></div>';
            } else {
                addTerminalLine(`<span class="output">${commands[command].replace(/\n/g, '<br>')}</span>`);
            }
        } else if (command) {
            addTerminalLine(`<span class="error">Comando não encontrado: ${command}. Digite 'help' para ver os comandos disponíveis.</span>`);
        }
        
        terminalInput.value = '';
    }
});

// Focus terminal input when clicking on terminal
document.querySelector('.terminal-interactive').addEventListener('click', () => {
    terminalInput.focus();
});

// Navbar scroll animation
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile theme toggle
const mobileThemeToggle = document.getElementById('mobileThemeToggle');
if (mobileThemeToggle) {
    mobileThemeToggle.addEventListener('click', () => {
        const isLight = root.classList.toggle('light');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        themeToggle.textContent = isLight ? '🌙' : '☀️';
        mobileThemeToggle.textContent = isLight ? '🌙 Tema' : '☀️ Tema';
    });
}