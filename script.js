const diseaseMap = {
    'подсолнечник': {
        'тля': [
            'На листьях видны мелкие зеленые или черные насекомые?',
            'Листья скручиваются или становятся липкими?',
            'Появились желтые пятна на нижней стороне листьев?'
        ],
        'подсолнечниковая огневка': [
            'В корзинках подсолнечника видны поврежденные семена?',
            'Обнаружены личинки в головках подсолнечника?',
            'На растениях видны бабочки с серыми крыльями?'
        ]
    },
    'рапс': {
        'капустная совка': [
            'На листьях видны большие отверстия от гусениц?',
            'Обнаружены гусеницы зеленого или бурого цвета?',
            'Растения выглядят обглоданными на нижнем ярусе?'
        ],
        'рапсовый цветоед': [
            'Бутоны растений повреждены или опадают преждевременно?',
            'На растениях видны жуки с металлическим блеском?',
            'Появились пустые или недоразвитые стручки?'
        ]
    },
    'соя': {
        'стеблевой долгоносик': [
            'Стебли растений имеют следы проколов или отверстий?',
            'Растения ломаются из-за слабости стеблей?',
            'На поверхности стеблей видны мелкие жучки?'
        ],
        'фитофтороз': [
            'На листьях видны бурые пятна с серым налетом?',
            'Растения увядают даже при достаточном увлажнении?',
            'Корни имеют черный или коричневый оттенок?'
        ]
    },
    'горчица': {
        'тля': [
            'На листьях видны мелкие зеленые или черные насекомые?',
            'Листья скручиваются или становятся липкими?',
            'Появились желтые пятна на нижней стороне листьев?',
            'Растения выглядят вялыми из-за ослабления стеблей?',
            'На стеблях заметны выделения липкой росы?'
        ],
        'белокрылка': [
            'На нижней стороне листьев видны мелкие белые насекомые?',
            'Листья покрыты липким налетом?',
            'Растения имеют замедленный рост?',
            'Появились признаки увядания молодых побегов?',
            'На листьях видны мелкие белые крылатые насекомые?'
        ],
        'крестоцветная блошка': [
            'На листьях видны мелкие прыгающие насекомые?',
            'Появились мелкие круглые отверстия на листьях?',
            'Листья начинают желтеть по краям?',
            'Растения ослаблены в сухую погоду?',
            'Повреждения усиливаются на молодых побегах?'
        ]
    },
    'рыжик': {
        'капустная моль': [
            'На листьях видны мелкие отверстия от гусениц?',
            'Обнаружены гусеницы зеленого цвета?',
            'Листья имеют следы прожорливости по краям?',
            'Появились поврежденные молодые побеги?',
            'На листьях заметны экскременты гусениц?'
        ],
        'клещ паутинный': [
            'На нижней стороне листьев видна паутина?',
            'Появились мелкие желтые пятна на листьях?',
            'Листья выглядят сухими и скрученными?',
            'Обнаружены мелкие движущиеся точки на растениях?',
            'Растения имеют замедленный рост из-за клещей?'
        ],
        'озимая совка': [
            'На растениях видны обгрызенные листья у основания?',
            'Обнаружены гусеницы в почве у корней?',
            'Растения увядают ночью или рано утром?',
            'Появились повреждения на стеблях у земли?',
            'Листья имеют неровные края от укусов?'
        ]
    }
};

const cropSelect = document.getElementById('crop');
const questionContainer = document.getElementById('question-container');
const currentQuestion = document.getElementById('current-question');
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const resultDiv = document.getElementById('result');

let currentCrop = '';
let questions = [];
let currentQuestionIndex = 0;
let answers = [];

function startDiagnosis() {
    currentCrop = cropSelect.value;
    questions = [];
    answers = [];
    currentQuestionIndex = 0;
    resultDiv.style.display = 'none';

    for (const disease in diseaseMap[currentCrop]) {
        questions = questions.concat(diseaseMap[currentCrop][disease]);
    }

    if (questions.length > 0) {
        questionContainer.style.display = 'block';
        showQuestion();
    }
}

function showQuestion() {
    if (currentQuestionIndex < questions.length) {
        currentQuestion.textContent = questions[currentQuestionIndex];
    } else {
        diagnose();
    }
}

function diagnose() {
    questionContainer.style.display = 'none';
    resultDiv.style.display = 'block';

    const diseases = diseaseMap[currentCrop];
    let maxMatches = 0;
    let diagnosedDisease = null;

    for (const disease in diseases) {
        const diseaseQuestions = diseases[disease];
        const matches = answers.reduce((count, answer, index) => {
            return count + (answer && diseaseQuestions.includes(questions[index]) ? 1 : 0);
        }, 0);
        if (matches > maxMatches) {
            maxMatches = matches;
            diagnosedDisease = disease;
        }
    }

    if (diagnosedDisease && maxMatches > 0) {
        resultDiv.textContent = `Диагноз: ${diagnosedDisease}. Рекомендация: Опрыскивание соответствующими препаратами.`;
    } else {
        resultDiv.textContent = 'Диагноз не определён. Уточните симптомы или обратитесь к специалисту.';
    }
}

cropSelect.addEventListener('change', startDiagnosis);
yesBtn.addEventListener('click', () => {
    answers.push(true);
    currentQuestionIndex++;
    showQuestion();
});
noBtn.addEventListener('click', () => {
    answers.push(false);
    currentQuestionIndex++;
    showQuestion();
});