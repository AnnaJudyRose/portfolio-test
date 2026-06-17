const cursor = document.getElementById("cursor");
const ring = document.getElementById("cursor-ring");

let mouseX = 0;
let mouseY = 0;

let ringX = 0;
let ringY = 0;

document.addEventListener("pointermove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursor.style.transform =
        `translate3d(${mouseX}px, ${mouseY}px, 0)`;
});

function animateRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;

    ring.style.transform =
        `translate3d(${ringX}px, ${ringY}px, 0)`;

    requestAnimationFrame(animateRing);
}

animateRing();

const hoverTargets = document.querySelectorAll(
    "a, button, .project-card, .contact-link"
);

hoverTargets.forEach((el) => {
    el.addEventListener("mouseenter", () => {
        cursor.classList.add("cursor-hover");
        ring.classList.add("cursor-ring-hover");
    });

    el.addEventListener("mouseleave", () => {
        cursor.classList.remove("cursor-hover");
        ring.classList.remove("cursor-ring-hover");
    });
});

const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 60));
function initReveal() {
    const obs = new IntersectionObserver(entries => {
        entries.forEach((e, i) => { if (e.isIntersecting) { setTimeout(() => e.target.classList.add('visible'), i * 80); obs.unobserve(e.target); } });
    }, { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}
initReveal();
function scrollTo(id) { const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }

const projects = [
    {
        id: 0, tag: 'Avionics · Autonomy · Systems Integration',
        title: 'VTOL Quadplane — Search & Rescue UAV',
        subtitle: 'Year-long group project to design, build and fly a VTOL quadplane for mountain search and rescue. Passed CAA flight certification, built for £588 against an £800 budget.',
        coverImg: 'Images/VTOL-Quadplane-Search-Rescue-UAV.jpg',
        year: '2023–2024', duration: '1 academic year', role: 'Avionics & Mission Planning Lead', team: '6-person group',
        tools: ['ArduPilot', 'Mission Planner', 'MATLAB', '433MHz Telemetry', 'LiPo Battery Sizing', 'ESC / Motor Wiring'],
        overview: `Over a full academic year at the University of Sheffield, my six-person team designed, built and flew a VTOL quadplane — a drone that lifts off vertically like a quadcopter, then transitions to forward fixed-wing flight. It was designed for search and rescue in mountainous terrain where no runway is available.\n\nWe built the entire aircraft for £588 against an £800 budget, passed Civil Aviation Authority flight certification, and got it into the air. My role was Avionics Ground System & Mission Planning Lead: I owned the flight software, the ground link, and the power budget.`,
        challenge: [
            'The drone flipped backwards on the first two take-off attempts. I had to diagnose the cause under flight-day pressure with the team watching.',
            'The aircraft was already over its 2 kg weight target, meaning every gram in the battery and avionics stack had to be justified.',
            'An intermittent GPS connection caused navigation instability that only appeared when powered — not on the bench.',
        ],
        approach: `I planned and flew the full autonomous mission in ArduPilot and Mission Planner: vertical take-off, transition to forward flight, GPS waypoints, return-to-home, and vertical landing — with a geofence and rally points configured. I ran the full mission in simulation over the actual flight-site terrain before we flew, and tuned the pitch PID loop for a stable, non-oscillating transition response.\n\nFor battery sizing, I worked back from the hover thrust requirement: ~1500g total means ~375g per motor with margin, which the motor data tables put at 5.4A each. Four VTOL motors gave 21.6A total, so I selected a 4000mAh 4S LiPo for approximately 11 minutes of endurance — clearing the 10-minute competition requirement.\n\nBefore touching the airframe, I built the <strong>"ironbird"</strong> — a full bench mock-up of the entire avionics stack to validate wiring and software. This is where I found and replaced a dead transponder before it became a flight-day problem.\n\nOn flight day, I traced the flip-on-take-off to two motor wires plugged into the wrong ESCs on one side, combined with an intermittent GPS connection. I found both faults with a power check, corrected them on-site, and the aircraft hovered successfully on the third attempt.`,
        results: [
            { num: '£588', desc: 'Total aircraft cost — £212 under budget' },
            { num: 'CAA', desc: 'Civil Aviation Authority flight certification passed' },
            { num: '3rd', desc: 'Successful hover achieved on third take-off attempt' },
            { num: '11min', desc: 'Hover endurance with 4000mAh 4S LiPo' },
        ],
        images: [
            { label: 'Team assembling the quadplane — wiring and avionics at the build bench', wide: true, src: 'Images/Team-assembling-the-quadplane-airframe-at-the-build-bench.jpg' },
            { label: 'Pre-flight final checks on the quadplane airframe at the flight site', src: 'Images/Mission-Planner-autonomous-waypoint-mission-over-flight-site-terrain.jpg' },
            { label: 'Ironbird — full avionics bench mock-up: ESCs, flight controller, motors and wiring', src: 'Images/Ironbird-avionics-bench-mock-up-and-wiring-verification.jpg' },
        ],
        next: 1,
    },
    {
        id: 1, tag: 'Avionics · Aircraft Maintenance · MRO',
        title: 'Avionics & Electrical Systems — Asia Aerotechnic',
        subtitle: 'Hands-on avionics maintenance internship on commercial aircraft, working to AMM standards under direct supervision of a licensed engineer.',
        coverImg: 'Images/Avionics-Electrical-Systems-Asia-Aerotechnic.jpg',
        year: '2024', duration: 'Industry internship', role: 'Avionics Engineering Intern', team: 'Under licensed engineer supervision',
        tools: ['Aeroflex IFR 6000', 'ADS-B / TCAS', 'AMM / Aviation Safety Standards', 'GPS Database (AIRAC)', 'Bonding Continuity Testing'],
        overview: `During my internship at Asia Aerotechnic, every task I carried out was done under the direct supervision of a licensed engineer, working to the Aircraft Maintenance Manual (AMM) and aviation safety standards.\n\nI focused on avionics and electrical systems — the electronics and wiring behind an aircraft's navigation, communication, and safety functions. The internship gave me a clear, ground-level understanding of how commercial avionics are maintained and why every step matters for flight safety.`,
        challenge: [
            'Every task had to meet strict AMM compliance — there is no room for improvisation in certified aircraft maintenance.',
            'Navigating real aircraft in MRO conditions (tight access panels, multi-system interdependencies) requires methodical thinking and attention to detail.',
            'Verifying collision-avoidance systems (ADS-B, TCAS) required careful operation of the Aeroflex IFR 6000 test set and interpretation of live results.',
        ],
        approach: `Working directly alongside a licensed engineer, I recharged and replaced aircraft batteries, rewired and installed GPS units, and replaced an Emergency Locator Transmitter and a pitot tube — the sensor that measures airspeed.\n\nI ran bonding continuity tests for lightning protection across multiple airframe points, and verified the ADS-B and TCAS collision-avoidance systems using the Aeroflex IFR 6000 test equipment. I also updated the GPS navigation database on the 28-day AIRAC cycle.\n\nWorking under the engineer throughout gave me a firsthand understanding of how avionics are maintained, how the AMM structures every task, and why precision at each step directly affects aircraft airworthiness.`,
        results: [
            { num: 'AMM', desc: 'All tasks performed to Aircraft Maintenance Manual standards' },
            { num: 'ADS-B', desc: 'Collision-avoidance systems verified with IFR 6000' },
            { num: 'AIRAC', desc: 'GPS navigation database updated on 28-day cycle' },
            { num: 'ELT', desc: 'Emergency Locator Transmitter successfully replaced' },
        ],
        images: [
            { label: 'Working on aircraft avionics bays during maintenance', wide: true, src: 'Images/Working-on-aircraft-avionics-bays-during-maintenance.png' },
            { label: 'Bonding continuity test on aircraft fuselage', src: 'Images/Bonding-continuity-test-on-aircraft-fuselage.png' },
            { label: 'ADS-B and TCAS verification using Aeroflex IFR 6000 on the apron', src: 'Images/ADS-B-TCAS-verification-with-Aeroflex-IFR-6000.png' },
        ],
        next: 0,
    },
    {
        id: 2, tag: 'Systems Design · Social Engineering · Teamwork',
        title: 'Multilingual Transport Kiosks — Global Engineering Challenge',
        subtitle: 'A week-long first-year team challenge to improve public transport access for refugees in Govan, Glasgow — focusing on the language barrier that affects over 87% of new arrivals.',
        coverImg: 'Images/Concept-sketch-Govan-bus-stop.jpg',
        year: 'Jan–Feb 2023', duration: '1 week', role: 'Concept Lead', team: '6-person cross-discipline team',
        tools: ['STEEPLE Analysis', 'Power-Influence Matrix', 'Risk Analysis', 'Stakeholder Mapping', 'Cost Breakdown'],
        overview: `The Global Engineering Challenge was a week-long team project in my first year, working with five other students from different engineering backgrounds. The brief was to improve access to public transport in Govan, Glasgow.\n\nThe problem we focused on was language: only around 12.6% of refugees can read English fluently when they arrive in the UK, which makes using buses and trains significantly harder. Without being able to read timetables, buy tickets, or understand route maps, navigating a city becomes a daily barrier.`,
        challenge: [
            'Scoping a real-world social problem in under a week with limited data and a cross-disciplinary team with no prior collaboration.',
            'Designing a solution that addressed language barriers without excluding users who are not comfortable with technology.',
            'Presenting a technically grounded proposal to a non-technical audience while keeping the concept cost-realistic and stakeholder-aware.',
        ],
        approach: `My contribution was the core idea: multilingual public-access kiosks at bus stops, allowing refugees and other users to plan journeys, buy tickets, and get live transport information in their own language. The interface would detect or allow selection of a preferred language, removing the English-literacy requirement entirely.\n\nThe team then developed this into a full concept proposal. I contributed to the STEEPLE analysis (Social, Technological, Economic, Environmental, Political, Legal, Ethical) and the power-influence matrix to map key stakeholders — from local government and transport operators to refugee support organisations and community groups.\n\nWe also produced a cost breakdown and a risk register covering implementation risks, adoption risks, and vandalism/maintenance concerns. The final deliverable was a presentation to a panel, framing the problem with data and presenting the solution clearly for a non-specialist audience.\n\nIt was a concept-only project, but it taught me how to scope a problem with limited information, work effectively in a mixed team under time pressure, and communicate an engineering idea to people who aren't engineers.`,
        results: [
            { num: '87%', desc: 'of UK-arriving refugees unable to read English fluently — the gap our solution addressed' },
            { num: '6', desc: 'engineering disciplines represented across the team' },
            { num: 'STEEPLE', desc: 'Full stakeholder and environmental analysis completed' },
            { num: '1 week', desc: 'Full concept scoped, analysed and presented' },
        ],
        images: [
            { label: 'TravelPoint — high-fidelity kiosk UI showing multilingual language selection and live bus times at Govan Cross', wide: true, src: 'Images/Concept-sketch-Govan-bus-stop.jpeg' },
            { label: 'Early wireframe annotated with design principles — language first, big choices, live feed, buy on the spot, human fallback', src: 'Images/STEEPLE-analysis-and-stakeholder-power-influence-matrix.jpeg' },
        ],
        next: 0,
    }
];


function openProject(idx) {
    var p = projects[idx];
    var next = projects[p.next];

    var imagesHtml = '<div class="proj-gallery">' + p.images.map(function (img) {
        var cls = 'proj-gallery-img' + (img.wide ? ' wide' : '');
        var inner = img.src
            ? '<img src="' + img.src + '" alt="' + img.label + '" style="width:100%;height:100%;object-fit:cover;filter:grayscale(10%);transition:transform .5s,filter .4s;">'
            : '<div class="proj-img-placeholder"><div class="ph-icon">⧡</div><div class="ph-label">' + img.label + '</div></div>';
        return '<div class="' + cls + '"><div style="width:100%;height:100%;">' + inner + '</div></div>';
    }).join('') + '</div>';

    var challengesHtml = '<ul class="challenge-list">' + p.challenge.map(function (ch, i) {
        return '<li class="challenge-item"><span class="challenge-num">0' + (i + 1) + '</span><span class="challenge-text">' + ch + '</span></li>';
    }).join('') + '</ul>';

    var resultsHtml = '<div class="results-grid">' + p.results.map(function (r) {
        return '<div class="result-item"><div class="result-num">' + r.num + '</div><div class="result-desc">' + r.desc + '</div></div>';
    }).join('') + '</div>';

    var toolsHtml = p.tools.map(function (t) {
        return '<span class="proj-tool-tag">' + t + '</span>';
    }).join('');

    var overviewParas = p.overview.split('\n\n').map(function (para) {
        return '<p>' + para + '</p>';
    }).join('');

    var approachParas = p.approach.split('\n\n').map(function (para) {
        return '<p>' + para + '</p>';
    }).join('');

    document.getElementById('app-project').innerHTML =
        '<div class="proj-detail-hero">' +
        '<div class="proj-detail-bg" style="background-image:url(\'' + p.coverImg + '\')"></div>' +
        '<div class="proj-detail-overlay"></div>' +
        '<div class="container proj-detail-content">' +
        '<button class="proj-back" onclick="showMain()">← Back to portfolio</button>' +
        '<span class="proj-detail-tag">' + p.tag + '</span>' +
        '<h1 class="proj-detail-title">' + p.title + '</h1>' +
        '<p class="proj-detail-subtitle">' + p.subtitle + '</p>' +
        '</div>' +
        '</div>' +
        '<div class="container">' +
        '<div class="proj-meta-bar">' +
        '<div class="proj-meta-item"><p class="proj-meta-label">Year</p><p class="proj-meta-value">' + p.year + '</p></div>' +
        '<div class="proj-meta-item"><p class="proj-meta-label">Duration</p><p class="proj-meta-value">' + p.duration + '</p></div>' +
        '<div class="proj-meta-item"><p class="proj-meta-label">Role</p><p class="proj-meta-value">' + p.role + '</p></div>' +
        '<div class="proj-meta-item"><p class="proj-meta-label">Team</p><p class="proj-meta-value">' + p.team + '</p></div>' +
        '</div>' +
        '<div class="proj-body">' +
        '<div class="proj-main">' +
        '<div class="proj-section"><p class="proj-section-label">Overview</p>' + overviewParas + '</div>' +
        '<div class="proj-section"><p class="proj-section-label">Project Images</p>' + imagesHtml + '</div>' +
        '<div class="proj-section"><p class="proj-section-label">Key Challenges</p>' + challengesHtml + '</div>' +
        '<div class="proj-section"><p class="proj-section-label">Approach & Methodology</p>' + approachParas + '</div>' +
        '<div class="proj-section"><p class="proj-section-label">Key Results</p>' + resultsHtml + '</div>' +
        '</div>' +
        '<aside class="proj-sidebar">' +
        '<div class="proj-sidebar-card"><p class="proj-sidebar-title">Tools Used</p><div class="proj-tools-list">' + toolsHtml + '</div></div>' +
        '<div class="proj-sidebar-card"><p class="proj-sidebar-title">Project Details</p>' +
        '<ul class="proj-detail-list">' +
        '<li><span class="lbl">Year</span><span class="val">' + p.year + '</span></li>' +
        '<li><span class="lbl">Duration</span><span class="val">' + p.duration + '</span></li>' +
        '<li><span class="lbl">Role</span><span class="val">' + p.role + '</span></li>' +
        '<li><span class="lbl">Team</span><span class="val">' + p.team + '</span></li>' +
        '</ul>' +
        '</div>' +
        '</aside>' +
        '</div>' +
        '<div class="next-project" onclick="openProject(' + p.next + ')">' +
        '<div><p class="next-label">Next Project</p><p class="next-title">' + next.title + '</p></div>' +
        '<span class="next-arrow">→</span>' +
        '</div>' +
        '</div>';

    document.getElementById('app-main').style.display = 'none';
    document.getElementById('app-project').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}


function showMain() {
    document.getElementById('app-main').style.display = 'block';
    document.getElementById('app-project').style.display = 'none';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(initReveal, 100);
}
