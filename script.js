const ADMIN_PASSWORD = "ХГУ2026";

// --- УМНАЯ ИНЪЕКЦИЯ СТИЛЕЙ И КОРРЕКЦИЯ ИНТЕРФЕЙСА ---
const runtimeStyle = document.createElement('style');
runtimeStyle.innerHTML = `
    /* Контейнер таблицы теперь скроллится САМ внутри себя, не ломая границы сайта */
    div:has(> #matrix-grid) {
        width: 100% !important;
        max-width: 100% !important;
        overflow-x: auto !important; 
        -webkit-overflow-scrolling: touch;
        padding-bottom: 15px;
    }
    
    /* Режим одной группы: центрируем таблицу */
    #matrix-grid.single-mode {
        width: 100% !important;
        max-width: 750px !important;
        margin: 25px auto !important;
    }
    
    /* Режим одного курса (6 групп): растягиваем на доступную ширину */
    #matrix-grid.fluid-mode {
        width: 100% !important;
        max-width: 100% !important;
        margin: 15px auto !important;
    }
    
    /* Сброс запретов на переносы строк во всех ячейках с уроками */
    #matrix-grid.single-mode *,
    #matrix-grid.fluid-mode * {
        box-sizing: border-box !important;
        white-space: normal; 
        word-break: break-word;
    }
    
    /* Запрет на перенос дней недели и оптимизация отступов */
    .grid-day-cell, .corner-cell {
        white-space: nowrap !important;
        padding-left: 5px !important;
        padding-right: 5px !important;
    }
    
    /* Оптимизация переноса слова «кредитҳо» на следующую строку */
    .corner-footer-cell {
        white-space: normal !important;
        word-break: break-word !important;
        padding-left: 5px !important;
        padding-right: 5px !important;
        text-align: center !important;
    }
    
    /* Экстремальное сжатие контента для 6 групп */
    #matrix-grid.fluid-mode .hour-slot {
        padding: 5px 3px !important;
        font-size: 11px !important; 
    }
    #matrix-grid.fluid-mode .slot-subject {
        font-size: 11px !important;
        font-weight: bold !important;
        line-height: 1.2 !important;
        margin: 3px 0 !important;
    }
    #matrix-grid.fluid-mode .slot-details {
        font-size: 10px !important;
        display: flex;
        flex-direction: column; 
        gap: 2px;
    }
    #matrix-grid.fluid-mode .slot-meta {
        font-size: 9px !important;
    }
    
    /* Снятие ограничений по ширине */
    #matrix-grid.single-mode .grid-matrix-cell,
    #matrix-grid.fluid-mode .grid-matrix-cell {
        min-width: 100px !important;
    }
    
    /* Возврат к полноценному скроллу всей огромной матрицы */
    #matrix-grid.full-mode {
        width: max-content !important;
        max-width: none !important;
    }

    /* Масштабирование логотипа и улучшение читаемости текста */
    .brand-section, .header-right, [class*="logo-container"] {
        display: flex !important;
        align-items: center !important;
        gap: 25px !important;
        transform: scale(1.15);
        transform-origin: right center;
    }
    
    [class*="logo-title"], .brand-section h1 {
        font-size: 3.2rem !important;
        font-weight: 900 !important;
        letter-spacing: 2px !important;
        margin: 0 !important;
    }

    [class*="logo-subtitle"], .brand-section p, .sub-logo-text {
        font-size: 1.3rem !important;
        color: #ffffff !important;
        font-weight: 800 !important;
        text-shadow: 0 0 8px rgba(0, 255, 255, 0.7) !important;
        letter-spacing: 0.5px !important;
        margin-top: 2px !important;
    }

    /* Центрирование главного заголовка таблицы */
    #schedule-view-title {
        text-align: center !important;
        width: 100% !important;
        display: block !important;
        margin: 25px auto !important;
        font-size: 1.6rem !important;
        font-weight: 800 !important;
        letter-spacing: 1px !important;
        text-transform: uppercase !important;
    }

    /* --- ОБНОВЛЕННЫЕ СТИЛИ ДЛЯ ИНТЕНСИВНОГО СВЕЧЕНИЯ И МИГАНИЯ ЯЧЕЕК --- */
    
    /* 1. Накладка (разные аудитории): Динамическое экстренное мигание («Сирена») */
    @keyframes redCyberBlink {
        0% { 
            border-color: #ff0055 !important; 
            box-shadow: 0 0 6px #ff0055, 0 0 18px #ff0055, inset 0 0 8px rgba(255, 0, 85, 0.6) !important;
            background: rgba(255, 0, 85, 0.22) !important;
        }
        50% { 
            border-color: rgba(255, 0, 85, 0.2) !important; 
            box-shadow: 0 0 2px rgba(255, 0, 85, 0.1), inset 0 0 2px rgba(255, 0, 85, 0.1) !important;
            background: rgba(255, 0, 85, 0.02) !important;
        }
        100% { 
            border-color: #ff0055 !important; 
            box-shadow: 0 0 6px #ff0055, 0 0 18px #ff0055, inset 0 0 8px rgba(255, 0, 85, 0.6) !important;
            background: rgba(255, 0, 85, 0.22) !important;
        }
    }
    .conflict-red-blink {
        border: 2px solid #ff0055 !important;
        animation: redCyberBlink 0.7s infinite ease-in-out !important;
        position: relative !important;
        z-index: 10 !important;
    }

    /* 2. Совмещенный поток (одна аудитория): Глубокое «дыхание» неоновой ауры */
    @keyframes blueCyberGlow {
        0% { 
            border-color: #00f0ff !important; 
            box-shadow: 0 0 6px #00f0ff, 0 0 16px #00f0ff, inset 0 0 8px rgba(0, 240, 255, 0.4) !important;
            background: rgba(0, 240, 255, 0.04) !important;
        }
        100% { 
            border-color: #0044ff !important; 
            box-shadow: 0 0 12px #0044ff, 0 0 32px #0044ff, inset 0 0 16px rgba(0, 68, 255, 0.6) !important;
            background: rgba(0, 68, 255, 0.25) !important;
        }
    }
    .conflict-blue-glow {
        border: 2px solid #00f0ff !important;
        animation: blueCyberGlow 1.4s infinite alternate ease-in-out !important;
        position: relative !important;
        z-index: 9 !important;
    }

    /* 3. Текущая идущая пара: Живой зеленый пульсирующий неон */
    .current-lesson-glow {
        border: 2px solid #00ff66 !important;
        position: relative !important;
        z-index: 8 !important;
        animation: greenCyberPulse 1.6s infinite alternate ease-in-out !important;
    }
    @keyframes greenCyberPulse {
        0% { 
            box-shadow: 0 0 6px #00ff66, 0 0 12px rgba(0, 255, 102, 0.4), inset 0 0 6px rgba(0, 255, 102, 0.2) !important;
            background: rgba(0, 255, 102, 0.02) !important;
        }
        100% { 
            box-shadow: 0 0 12px #00ff66, 0 0 26px #00ff66, inset 0 0 14px rgba(0, 255, 102, 0.5) !important;
            background: rgba(0, 255, 102, 0.16) !important;
        }
    }
`;
document.head.appendChild(runtimeStyle);

const daysConfig = [
    { id: 0, name: "ДУШАНБЕ" }, { id: 1, name: "СЕШАНБЕ" }, { id: 2, name: "ЧОРШАНБЕ" },
    { id: 3, name: "ПАНҶШАНБЕ" }, { id: 4, name: "ҶУМЪА" }, { id: 5, name: "ШАНБЕ" }
];

const hoursConfig = [
    { id: 0, time: "08:00 - 08:50" },
    { id: 1, time: "09:00 - 09:50" },
    { id: 2, time: "10:00 - 10:50" },
    { id: 3, time: "11:00 - 11:50" },
    { id: 4, time: "12:00 - 12:50" }
];

const afternoonHours = [
    "13:00 - 13:50",
    "14:00 - 14:50",
    "15:00 - 15:50",
    "16:00 - 16:50",
    "17:00 - 17:50"
];

const directions = ["Математикаи амалӣ", "Математикаи умумӣ", "Информатика", "Физика", "Астрономия", "Амнияти компютерӣ"];

const allGroupsConfig = [];
directions.forEach(dir => {
    for (let c = 1; c <= 4; c++) {
        allGroupsConfig.push({
            id: `${c}_${dir}`,
            course: c.toString(),
            groupName: dir,
            label: `<strong>${dir}</strong><small>${c}-ум курс</small>`
        });
    }
});

const teacherAssignments = [
    { teacher: "Амонбекова З.А.", subjects: [{ name: "Асосҳои зеҳни сунъӣ", credits: 3 }, { name: "Асосҳои криптографӣ", credits: 3 }, { name: "Асосҳои ҳуқуқии криптография", credits: 2 }] },
    { teacher: "Довутов Ф.М.", subjects: [{ name: "Асосҳои BigData", credits: 4 }, { name: "Математикаи дискретӣ", credits: 3 }, { name: "Мантиқи математикӣ", credits: 3 }, { name: "Ҳисоббарории абрӣ ва системаҳои тақсимшуда", credits: 4 }, { name: "Асосҳои барномасозӣ", credits: 4 }, { name: "Асосҳои Web-дизайн", credits: 4 }] },
    { teacher: "Музофиров Д.Г.", subjects: [{ name: "Асосҳои информатика", credits: 3 }, { name: "Забони барномасозии PHP", credits: 3 }, { name: "Асосҳои JavaScript&React", credits: 4 }, { name: "Архитектураи компютер", credits: 2 }, { name: "Системаҳои оператсионӣ", credits: 2 }, { name: "Графика ва дизайни компютерӣ", credits: 3 }] },
    { teacher: "Шогунбекова Г.Ш.", subjects: [{ name: "Забони барномасоии Python", credits: 4 }, { name: "Асосҳои информатика", credits: 3 }, { name: "СИБД", credits: 2 }] },
    { teacher: "Шодибекова Ш.", subjects: [{ name: "Асосҳои информатика", credits: 3 }, { name: "МТМИ", credits: 2 }] },
    { teacher: "Гуламадшоева М.", subjects: [{ name: "Криптография", credits: 3 }, { name: "Технологияи мултимедӣ", credits: 3 }, { name: "Дизайни компютерӣ", credits: 2 }] },
    { teacher: "Худоназаров М.Ғ.", subjects: [{ name: "Физикаи умумӣ", credits: 4 }, { name: "Термодинамика", credits: 3 }, { name: "Механика", credits: 2 }, { name: "Оптика", credits: 3 }, { name: "Астрономия", credits: 2 }] },
    { teacher: "Ақсақолов Ф.", subjects: [{ name: "Таҳлили функсионалӣ", credits: 2 }, { name: "Математика дар физика", credits: 3 }, { name: "Муодилаҳои физикӣ-математикӣ", credits: 2 }] },
    { teacher: "Абдулҳофизов Ш.", subjects: [{ name: "Таҳлили математикӣ", credits: 4 }] },
    { teacher: "Холмамадова Ш.А.", subjects: [{ name: "Таҳлили математикӣ", credits: 3 }, { name: "Математикаи олӣ", credits: 2 }, { name: "НЭ ва ОМ", credits: 3 }] },
    { teacher: "Мирзонаботов Р.", subjects: [{ name: "Таҳлили математикӣ", credits: 2 }, { name: "Геометрияи аналитикӣ", credits: 3 }] },
    { teacher: "Наврузмамадова С.", subjects: [{ name: "Таҳлили математикӣ", credits: 3 }, { name: "НЭ ва ОМ", credits: 2 }, { name: "Назарияи наздиккуниҳо", credits: 2 }] },
    { teacher: "Сафоназарова З.", subjects: [{ name: "Физикаи умумӣ", credits: 2 }, { name: "Оптика", credits: 2 }, { name: "Термодинамика", credits: 3 }] },
    { teacher: "Ҷангибек М.", subjects: [{ name: "Моделсозии математикӣ", credits: 3 }, { name: "Асосҳои информатика", credits: 2 }] },
    { teacher: "Шоҳидарвозова Г.", subjects: [{ name: "Забони барномасозии С++", credits: 4 }] },
    { teacher: "Дилдорбекзода С.", subjects: [{ name: "Забони барномасозии Python", credits: 3 }, { name: "Забони барномасозии С++", credits: 2 }] }
];

let teachersDatabase = JSON.parse(localStorage.getItem('facultyTeachersList')) || teacherAssignments.map(ta => ta.teacher);
let subjectsDatabase = JSON.parse(localStorage.getItem('facultySubjectsList')) || [];

teacherAssignments.forEach(ta => {
    ta.subjects.forEach(s => { if(!subjectsDatabase.includes(s.name)) subjectsDatabase.push(s.name); });
});
["Кори мустақили донишҷӯ", "Консултатсия"].forEach(act => {
    if(!subjectsDatabase.includes(act)) subjectsDatabase.push(act);
});
localStorage.setItem('facultySubjectsList', JSON.stringify(subjectsDatabase));

// Проверяем, есть ли уже сохраненное расписание в браузере
let scheduleDatabase = JSON.parse(localStorage.getItem('permanentMatrixSchedule'));
const roomsPool = ["Ауд. 104", "Ауд. 202", "Ауд. 303", "Ауд. 405", "Ауд. 112", "Ауд. 218", "Ауд. 301", "Лаб. ИТ"];

// ЕСЛИ РАСПИСАНИЯ НЕТ (первый запуск сайта), запускаем генерацию базового шаблона
if (!scheduleDatabase) {
    scheduleDatabase = {};
    const teacherTimeline = {}; 

    function getTargetDirections(subjectName) {
        let nameLower = subjectName.toLowerCase();
        if (nameLower.includes("информатика") || nameLower.includes("мтми") || nameLower.includes("барнома") || nameLower.includes("python") || nameLower.includes("с++") || nameLower.includes("web") || nameLower.includes("bigdata") || nameLower.includes("javascript") || nameLower.includes("php") || nameLower.includes("компютер") || nameLower.includes("оператсионӣ") || nameLower.includes("сибд") || nameLower.includes("зеҳни") || nameLower.includes("криптограф")) {
            return ["Информатика", "Амнияти компютерӣ"];
        } else if (nameLower.includes("физика") || nameLower.includes("термодинамика") || nameLower.includes("механика") || nameLower.includes("оптика") || nameLower.includes("астрономия")) {
            return ["Физика", "Астрономия"];
        } else {
            return ["Математикаи амалӣ", "Математикаи умумӣ"];
        }
    }

    teacherAssignments.forEach(ta => {
        ta.subjects.forEach(sub => {
            const targetDirs = getTargetDirections(sub.name);
            const targetGroups = allGroupsConfig.filter(g => targetDirs.includes(g.groupName));

            targetGroups.forEach(group => {
                let placedHours = 0;
                let neededPairs = sub.credits >= 4 ? 2 : 1; 

                for (let d = 0; d < 6 && placedHours < neededPairs; d++) {
                    for (let h = 0; h < 5; h++) {
                        const tKey = `${d}_${h}_${ta.teacher}`;
                        const dbKey = `${d}_${group.id}_${h}`;

                        if (!teacherTimeline[tKey] && !scheduleDatabase[dbKey]) {
                            scheduleDatabase[dbKey] = {
                                subject: sub.name,
                                type: sub.credits >= 4 ? "Лексия" : "Практика",
                                teacher: ta.teacher,
                                room: roomsPool[Math.floor(Math.random() * roomsPool.length)],
                                credits: sub.credits
                            };
                            teacherTimeline[tKey] = true;
                            placedHours++;
                            break;
                        }
                    }
                }
            });
        });
    });

    const fillActivities = ["Кори мустақили донишҷӯ", "Консултатсия"];
    daysConfig.forEach(day => {
        allGroupsConfig.forEach(group => {
            const localTeachers = teacherAssignments.filter(ta => {
                return ta.subjects.some(s => getTargetDirections(s.name).includes(group.groupName));
            }).map(ta => ta.teacher);

            hoursConfig.forEach(hour => {
                const dbKey = `${day.id}_${group.id}_${hour.id}`;

                if (!scheduleDatabase[dbKey]) {
                    let chosenTeacher = "Кафедраи ИТ";
                    for (let t of localTeachers) {
                        if (!teacherTimeline[`${day.id}_${hour.id}_${t}`]) {
                            chosenTeacher = t;
                            teacherTimeline[`${day.id}_${hour.id}_${t}`] = true;
                            break;
                        }
                    }

                    const actName = fillActivities[(day.id + hour.id) % fillActivities.length];
                    scheduleDatabase[dbKey] = {
                        subject: actName,
                        type: "Лаборатория",
                        teacher: chosenTeacher,
                        room: roomsPool[(day.id + hour.id) % roomsPool.length],
                        credits: 0 
                    };
                }
            });
        });
    });

    // Сохраняем сгенерированную базу в память, чтобы больше её не перезаписывать
    localStorage.setItem('permanentMatrixSchedule', JSON.stringify(scheduleDatabase));
}

let newsDatabase = JSON.parse(localStorage.getItem('facultyNewsDatabase')) || [
    { title: "Ҷаласаи маҳфили илмӣ", content: "Рӯзи панҷшанбе дар аудиторияи 201 ҷаласаи маҳфили илмии донишҷӯён баргузор мегардад.", date: "19.05.2026" },
    { title: "Оғози имтиҳонҳои сессия", content: "Ба диққати донишҷӯён расонида мешавад, ки супоридани имтиҳонҳои ҷорӣ аз 1-уми июн оғос меёбад.", date: "18.05.2026" }
];
localStorage.setItem('facultyNewsDatabase', JSON.stringify(newsDatabase));

function populateDynamicFilters() {
    const tSelect = document.getElementById('teacher-select');
    const sSelect = document.getElementById('subject-select');
    const adminTSelect = document.getElementById('admin-teacher');
    const adminSSelect = document.getElementById('admin-subject');

    const currentT = tSelect ? tSelect.value : "all";
    const currentS = sSelect ? sSelect.value : "all";

    teachersDatabase.sort();
    subjectsDatabase.sort();

    if(tSelect) tSelect.innerHTML = '<option value="all">Ҳамаи омӯзгорон</option>' + teachersDatabase.map(t => `<option value="${t}">${t}</option>`).join('');
    if(sSelect) sSelect.innerHTML = '<option value="all">Ҳамаи фанҳо</option>' + subjectsDatabase.map(s => `<option value="${s}">${s}</option>`).join('');
    if(adminTSelect) adminTSelect.innerHTML = teachersDatabase.map(t => `<option value="${t}">${t}</option>`).join('');
    if(adminSSelect) adminSSelect.innerHTML = subjectsDatabase.map(s => `<option value="${s}">${s}</option>`).join('');

    if(tSelect) tSelect.value = currentT || "all";
    if(sSelect) sSelect.value = currentS || "all";
}

function getAcademicYearString() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth(); 
    const startYear = currentMonth >= 8 ? currentYear : currentYear - 1;
    const endYear = startYear + 1;
    return `${startYear}-${endYear}`;
}

function renderMatrixGrid() {
    const selectedCourse = document.getElementById('course-select').value;
    const selectedGroup = document.getElementById('group-select').value;
    const selectedTeacher = document.getElementById('teacher-select').value;
    const selectedSubject = document.getElementById('subject-select').value;
    
    const grid = document.getElementById('matrix-grid');
    const viewTitle = document.getElementById('schedule-view-title');
    if(!grid) return;
    
    grid.innerHTML = '';
    grid.classList.remove('single-mode', 'fluid-mode', 'full-mode', 'focused-view');

    if (selectedCourse !== 'all' || selectedGroup !== 'all' || selectedTeacher !== 'all' || selectedSubject !== 'all') {
        grid.classList.add('focused-view');
        if(viewTitle) viewTitle.innerText = "ҶАДВАЛИ ФОКУСРОНИДАШУДАИ СЕКТОР";
    } else {
        if(viewTitle) {
            viewTitle.innerText = `ҷадвали дарсҳои факултет барои солҳои таҳсили ${getAcademicYearString()}`;
        }
    }

    // ИСПРАВЛЕНО: Безопасный сбор коллизий и потоков с учетом составных названий групп
    const teacherUsageMap = {}; 
    for (const key in scheduleDatabase) {
        const parts = key.split('_');
        if (parts.length < 4) continue; 

        const d = parts[0];                         
        const h = parts[parts.length - 1];          
        const gId = parts.slice(1, -1).join('_');   

        const les = scheduleDatabase[key];
        if (les && les.teacher && les.subject && les.subject !== "-" && les.teacher !== "Кафедраи ИТ") {
            const mapKey = `${d}_${h}_${les.teacher}`;
            if (!teacherUsageMap[mapKey]) teacherUsageMap[mapKey] = [];
            teacherUsageMap[mapKey].push({ gId: gId, room: les.room });
        }
    }

    const visibleGroups = allGroupsConfig.filter(g => {
        return (selectedCourse === 'all' || g.course === selectedCourse) && (selectedGroup === 'all' || g.groupName === selectedGroup);
    });

    if (visibleGroups.length === 1) {
        grid.classList.add('single-mode');
        grid.style.setProperty('grid-template-columns', '135px 1fr', 'important');
    } else if (visibleGroups.length <= 6) {
        grid.classList.add('fluid-mode');
        grid.style.setProperty('grid-template-columns', `135px repeat(${visibleGroups.length}, 1fr)`, 'important');
    } else {
        grid.classList.add('full-mode');
        grid.style.setProperty('grid-template-columns', `135px repeat(${visibleGroups.length}, minmax(180px, 1fr))`, 'important');
    }

    const cornerCell = document.createElement('div');
    cornerCell.className = 'grid-header-cell';
    cornerCell.innerHTML = 'Гурӯҳ / Курс';
    grid.appendChild(cornerCell);

    visibleGroups.forEach(g => {
        const headerCell = document.createElement('div');
        headerCell.className = 'grid-header-cell';
        headerCell.innerHTML = g.label;
        grid.appendChild(headerCell);
    });

    const groupCreditsMap = {};
    visibleGroups.forEach(g => { groupCreditsMap[g.id] = {}; });

    daysConfig.forEach(day => {
        const dayCell = document.createElement('div');
        dayCell.className = 'grid-day-cell';
        dayCell.innerHTML = `<strong>${day.name}</strong>`;
        grid.appendChild(dayCell);

        visibleGroups.forEach(g => {
            const matrixCell = document.createElement('div');
            matrixCell.className = 'grid-matrix-cell';
            let cellHTML = '';

            hoursConfig.forEach(hour => {
                const key = `${day.id}_${g.id}_${hour.id}`;
                let lesson = scheduleDatabase[key];

                const actualTime = (g.groupName === "Амнияти компютерӣ") ? afternoonHours[hour.id] : hour.time;

                if (lesson) {
                    if (lesson.subject && lesson.subject !== "-") {
                        groupCreditsMap[g.id][lesson.subject] = lesson.credits;
                    }

                    let isVisible = true;
                    if (selectedTeacher !== 'all' && lesson.teacher !== selectedTeacher) isVisible = false;
                    if (selectedSubject !== 'all' && lesson.subject !== selectedSubject) isVisible = false;

                    if (isVisible) {
                        // ОПРЕДЕЛЕНИЕ КЛАССА НЕОНОВОГО СВЕЧЕНИЯ
                        let colorStatusClass = '';
                        const mapKey = `${day.id}_${hour.id}_${lesson.teacher}`;
                        
                        if (lesson.teacher && lesson.teacher !== "Кафедраи ИТ" && teacherUsageMap[mapKey] && teacherUsageMap[mapKey].length > 1) {
                            const roomsAtThisHour = teacherUsageMap[mapKey].map(item => item.room);
                            const uniqueRooms = new Set(roomsAtThisHour);
                            
                            if (uniqueRooms.size > 1) {
                                colorStatusClass = ' conflict-red-blink'; // Аварийная сирена
                            } else {
                                colorStatusClass = ' conflict-blue-glow'; // Глубокое дыхание неона
                            }
                        }

                        cellHTML += `
                            <div class="hour-slot${colorStatusClass}" data-day="${day.id}" data-hour="${hour.id}" data-time="${actualTime}">
                                <div class="slot-meta">
                                    <span class="slot-time">${actualTime.split(' ')[0]}</span>
                                    <span class="slot-type type-${lesson.type.toLowerCase()}">${lesson.type}</span>
                                </div>
                                <div class="slot-subject">${lesson.subject}</div>
                                <div class="slot-details">
                                    <span>👤 ${lesson.teacher}</span>
                                    <span>🚪 ${lesson.room}</span>
                                </div>
                            </div>`;
                    } else {
                        cellHTML += `
                            <div class="hour-slot" data-day="${day.id}" data-hour="${hour.id}" data-time="${actualTime}">
                                <div class="slot-meta"><span class="slot-time">${actualTime.split(' ')[0]}</span></div>
                                <div class="slot-empty">-</div>
                            </div>`;
                    }
                }
            });
            matrixCell.innerHTML = cellHTML;
            grid.appendChild(matrixCell);
        });
    });

    const footerCorner = document.createElement('div');
    footerCorner.className = 'grid-footer-cell corner-footer-cell';
    footerCorner.innerHTML = 'Ҷамъбасти кредитҳо';
    grid.appendChild(footerCorner);

    visibleGroups.forEach(g => {
        const footerCell = document.createElement('div');
        footerCell.className = 'grid-footer-cell';

        const subsObj = groupCreditsMap[g.id] || {};
        const uniqueSubjects = Object.keys(subsObj);

        let footerHTML = '<div class="footer-subjects-list">';
        let totalCredits = 0;

        uniqueSubjects.forEach(subName => {
            const cr = subsObj[subName];
            totalCredits += cr;
            footerHTML += `
                <div class="footer-sub-item" title="${subName}">
                    <span>${subName}</span>
                    <strong>${cr} CR</strong>
                </div>`;
        });

        footerHTML += `</div><div class="footer-total">⚡ Ҷамъ: ${totalCredits} CR</div>`;
        footerCell.innerHTML = footerHTML;
        grid.appendChild(footerCell);
    });

    checkAndHighlightCurrentLesson();
}

function toggleSidebar(open) {
    const sidebar = document.getElementById('news-sidebar');
    if (sidebar) {
        if (open) {
            sidebar.classList.add('open');
            renderNews();
        } else {
            sidebar.classList.remove('open');
        }
    }
}

function renderNews() {
    const container = document.getElementById('news-container');
    const sidebarHeader = document.querySelector('#news-sidebar h3');
    if(sidebarHeader) sidebarHeader.innerText = "ХАБАРҲОИ ФАКУЛТЕТ";
    
    if(container) {
        container.innerHTML = newsDatabase.map(news => `
            <div class="news-card">
                <h4>${news.title}</h4>
                <p>${news.content}</p>
                <span class="news-date">📅 ${news.date}</span>
            </div>
        `).join('');
    }
}

function openAdminPanel() {
    const pass = prompt("Рамзи воридшавиро ворид кунед:");
    if (pass === ADMIN_PASSWORD) {
        document.getElementById('admin-panel').style.display = 'flex';
        initAdminStaticOptions();
    } else if (pass !== null) {
        alert("Рамз хато аст!");
    }
}

function closeAdminPanel() {
    document.getElementById('admin-panel').style.display = 'none';
}

function switchAdminTab(tab) {
    document.getElementById('tab-schedule-btn').classList.toggle('active', tab === 'schedule');
    document.getElementById('tab-news-btn').classList.toggle('active', tab === 'news');
    
    const newsTabBtn = document.getElementById('tab-news-btn');
    if(newsTabBtn) newsTabBtn.innerText = "➕ Иловаи Хабар";

    document.getElementById('admin-schedule-form').style.display = tab === 'schedule' ? 'block' : 'none';
    document.getElementById('admin-news-form').style.display = tab === 'news' ? 'block' : 'none';
}

function updateAdminPairs() {
    const groupSelect = document.getElementById('admin-group');
    const pairSelect = document.getElementById('admin-pair');
    if (!groupSelect || !pairSelect) return;

    const selectedGroupId = groupSelect.value;
    const targetGroup = allGroupsConfig.find(g => g.id === selectedGroupId);
    const isSecondShift = targetGroup && targetGroup.groupName === "Амнияти компютерӣ";

    pairSelect.innerHTML = hoursConfig.map(h => {
        const displayTime = isSecondShift ? afternoonHours[h.id] : h.time;
        return `<option value="${h.id}">${displayTime}</option>`;
    }).join('');
}

function initAdminStaticOptions() {
    const daySelect = document.getElementById('admin-day');
    const groupSelect = document.getElementById('admin-group');

    if (daySelect && daySelect.children.length === 0) {
        daysConfig.forEach(d => daySelect.innerHTML += `<option value="${d.id}">${d.name}</option>`);
        allGroupsConfig.forEach(g => {
            const clearLabel = g.label.replace('<strong>','').replace('</strong>','').replace('<small>',' | ').replace('</small>','');
            groupSelect.innerHTML += `<option value="${g.id}">${clearLabel}</option>`;
        });
        groupSelect.addEventListener('change', updateAdminPairs);
    }
    updateAdminPairs();
    populateDynamicFilters();
}

function promptNewTeacher() {
    const newT = prompt("Ному насаби омӯзгори навро ворид кунед:");
    if (newT && newT.trim() !== "") {
        if (!teachersDatabase.includes(newT.trim())) {
            teachersDatabase.push(newT.trim());
            localStorage.setItem('facultyTeachersList', JSON.stringify(teachersDatabase));
            populateDynamicFilters();
            if(document.getElementById('admin-teacher')) document.getElementById('admin-teacher').value = newT.trim();
        } else {
            alert("Ин омӯзгор аллакай мавҷуд аст!");
        }
    }
}

function promptNewSubject() {
    const newS = prompt("Номи фанни навро ворид кунед:");
    if (newS && newS.trim() !== "") {
        if (!subjectsDatabase.includes(newS.trim())) {
            subjectsDatabase.push(newS.trim());
            localStorage.setItem('facultySubjectsList', JSON.stringify(subjectsDatabase));
            populateDynamicFilters();
            if(document.getElementById('admin-subject')) document.getElementById('admin-subject').value = newS.trim();
        } else {
            alert("Ин фан аллакай мавҷуд аст!");
        }
    }
}

function deleteSelectedTeacher() {
    const adminTSelect = document.getElementById('admin-teacher');
    if (!adminTSelect) return;
    const tToDelete = adminTSelect.value;
    
    if (!tToDelete) {
        alert("Омӯзгорро барои тоза кардан интихоб кунед!");
        return;
    }
    
    if (confirm(`Шумо ҳақиқатан мехоҳед омӯзгор "${tToDelete}"-ро аз база тоза кунед?`)) {
        teachersDatabase = teachersDatabase.filter(t => t !== tToDelete);
        localStorage.setItem('facultyTeachersList', JSON.stringify(teachersDatabase));
        populateDynamicFilters();
        renderMatrixGrid();
        alert(`Омӯзгор "${tToDelete}" бомуваффақият тоза карда шуд.`);
    }
}

function deleteSelectedSubject() {
    const adminSSelect = document.getElementById('admin-subject');
    if (!adminSSelect) return;
    const sToDelete = adminSSelect.value;
    
    if (!sToDelete) {
        alert("Фанро барои тоза кардан интихоб кунед!");
        return;
    }
    
    if (confirm(`Шумо ҳақиқатан мехоҳед фанни "${sToDelete}"-ро аз база тоза кунед?`)) {
        subjectsDatabase = subjectsDatabase.filter(s => s !== sToDelete);
        localStorage.setItem('facultySubjectsList', JSON.stringify(subjectsDatabase));
        populateDynamicFilters();
        renderMatrixGrid();
        alert(`Фанни "${sToDelete}" бомуваффақият тоза карда шуд.`);
    }
}

function checkAndHighlightCurrentLesson() {
    const now = new Date();
    const jsDay = now.getDay();
    const currentDayId = jsDay === 0 ? -1 : jsDay - 1; 
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    document.querySelectorAll('.hour-slot.current-lesson-glow').forEach(el => {
        el.classList.remove('current-lesson-glow');
    });

    if (currentDayId !== -1) {
        const activeSlots = document.querySelectorAll(`.hour-slot[data-day="${currentDayId}"]`);
        activeSlots.forEach(slot => {
            const timeRange = slot.getAttribute('data-time');
            if (!timeRange) return;

            const [startStr, endStr] = timeRange.split(" - ");
            const [sH, sM] = startStr.split(":").map(Number);
            const [eH, eM] = endStr.split(":").map(Number);
            const startMinutes = sH * 60 + sM;
            const endMinutes = eH * 60 + eM;

            if (currentMinutes >= startMinutes && currentMinutes <= endMinutes) {
                if (slot.querySelector('.slot-subject')) {
                    slot.classList.add('current-lesson-glow'); 
                }
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('button, a, span, h2, h3').forEach(el => {
        if(el.textContent.toLowerCase().includes('навгонӣ')) {
            el.textContent = el.textContent.replace(/навгонӣ/gi, 'Хабар');
        }
        if(el.textContent.toLowerCase().includes('навгониҳо')) {
            el.textContent = el.textContent.replace(/навгониҳо/gi, 'Хабарҳо');
        }
    });

    populateDynamicFilters();

    const cSel = document.getElementById('course-select');
    const gSel = document.getElementById('group-select');
    const tSel = document.getElementById('teacher-select');
    const sSel = document.getElementById('subject-select');

    if(cSel) cSel.addEventListener('change', renderMatrixGrid);
    if(gSel) gSel.addEventListener('change', renderMatrixGrid);
    if(tSel) tSel.addEventListener('change', renderMatrixGrid);
    if(sSel) sSel.addEventListener('change', renderMatrixGrid);
    
    const scheduleForm = document.getElementById('admin-schedule-form');
    if(scheduleForm) {
        scheduleForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const key = `${document.getElementById('admin-day').value}_${document.getElementById('admin-group').value}_${document.getElementById('admin-pair').value}`;
            
            scheduleDatabase[key] = {
                subject: document.getElementById('admin-subject').value,
                type: document.getElementById('admin-type').value,
                credits: parseInt(document.getElementById('admin-credits').value || 0),
                teacher: document.getElementById('admin-teacher').value,
                room: document.getElementById('admin-room').value
            };
            
            localStorage.setItem('permanentMatrixSchedule', JSON.stringify(scheduleDatabase));
            renderMatrixGrid();
            closeAdminPanel();
        });
    }

    const newsForm = document.getElementById('admin-news-form');
    if(newsForm) {
        const titleLabel = newsForm.querySelector('label[for="news-title-input"]');
        if(titleLabel) titleLabel.innerText = "Сарлавҳаи хабар:";
        
        newsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = document.getElementById('news-title-input').value.trim();
            const content = document.getElementById('news-content-input').value.trim();
            
            const today = new Date();
            const dateStr = `${String(today.getDate()).padStart(2,'0')}.${String(today.getMonth()+1).padStart(2,'0')}.${today.getFullYear()}`;

            newsDatabase.unshift({ title, content, date: dateStr });
            localStorage.setItem('facultyNewsDatabase', JSON.stringify(newsDatabase));
            
            document.getElementById('news-title-input').value = '';
            document.getElementById('news-content-input').value = '';
            
            closeAdminPanel();
            toggleSidebar(true);
        });
    }

    renderMatrixGrid();
    setInterval(checkAndHighlightCurrentLesson, 60000);
});