window.EAZY_CONTENT = window.EAZY_CONTENT || {};
window.EAZY_CONTENT[1] = {
  "intro": "Планиметрия — девять типов задач №1. В шпаргалке у каждого типа есть чертёж, обозначения и все нужные формулы. Тренировка — задания из демоверсии ЕГЭ-2027.",
  "theory": "Задание 1 — планиметрия: треугольники, параллелограмм, трапеция, окружности. Сначала определи тип фигуры из условия, открой её карточку — там расшифровка обозначений и формулы. Задачи одношаговые: всё решает правильно выбранная формула.",
  "formulas": [
    {
      "title": "Прямоугольный треугольник",
      "text": "<span class=\"f-note\"><strong>Обозначения:</strong> a, b — катеты; c — гипотенуза; h — высота к гипотенузе; S — площадь; R, r — радиусы описанной и вписанной окружностей.</span>$c^2=a^2+b^2$ · $\\sin A=\\frac{a}{c}$, $\\cos A=\\frac{b}{c}$, $\\tg A=\\frac{a}{b}$ · $S=\\frac{1}{2}ab$ · $h=\\frac{ab}{c}$ · медиана к гипотенузе $=\\frac{c}{2}$ · $R=\\frac{c}{2}$, $r=\\frac{a+b-c}{2}$.",
      "figure": {"svg": `<svg viewBox="0 0 200 150" role="img" aria-label="Прямоугольный треугольник"><g fill="none" stroke="currentColor" stroke-width="1.8"><path d="M25 120 L175 120 L25 30 Z"/><path d="M25 106 L39 106 L39 120" stroke-width="1.2"/></g><g fill="currentColor" font-size="11" font-style="italic"><text x="14" y="136">A</text><text x="178" y="136">B</text><text x="14" y="24">C</text><text x="100" y="136">a</text><text x="12" y="80">b</text><text x="104" y="70">c</text></g></svg>`}
    },
    {
      "title": "Равнобедренный треугольник",
      "text": "<span class=\"f-note\"><strong>Обозначения:</strong> a — основание; b — боковая сторона; h — высота к основанию; S — площадь.</span>Высота к основанию — одновременно медиана и биссектриса · $a=2\\sqrt{b^2-h^2}$ · $S=\\frac{1}{2}ah$ · углы при основании равны.",
      "figure": {"svg": `<svg viewBox="0 0 200 150" role="img" aria-label="Равнобедренный треугольник"><g fill="none" stroke="currentColor" stroke-width="1.8"><path d="M30 120 L170 120 L100 30 Z"/><path d="M100 30 L100 120" stroke-dasharray="5 4"/><path d="M100 106 L114 106 L114 120" stroke-width="1.2"/></g><g fill="currentColor" font-size="11" font-style="italic"><text x="19" y="136">A</text><text x="173" y="136">B</text><text x="94" y="24">C</text><text x="106" y="80">h</text><text x="96" y="136">a</text><text x="50" y="72">b</text></g></svg>`}
    },
    {
      "title": "Треугольник общего вида",
      "text": "<span class=\"f-note\"><strong>Обозначения:</strong> a, b, c — стороны; h — высота к стороне a; γ — угол между a и b; p — полупериметр; S — площадь; R — радиус описанной.</span>$S=\\frac{1}{2}ah$ · $S=\\frac{1}{2}ab\\sin\\gamma$ · $S=\\sqrt{p(p-a)(p-b)(p-c)}$ · сумма углов $180°$ · $c^2=a^2+b^2-2ab\\cos\\gamma$.",
      "figure": {"svg": `<svg viewBox="0 0 200 150" role="img" aria-label="Треугольник общего вида"><g fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20 120 L180 120 L130 30 Z"/><path d="M130 30 L130 120" stroke-dasharray="5 4"/><path d="M130 106 L144 106 L144 120" stroke-width="1.2"/></g><g fill="currentColor" font-size="11" font-style="italic"><text x="8" y="136">A</text><text x="183" y="136">B</text><text x="123" y="22">C</text><text x="134" y="136">a</text><text x="134" y="80">h</text><text x="160" y="70">c</text><text x="60" y="70">b</text></g></svg>`}
    },
    {
      "title": "Параллелограмм",
      "text": "<span class=\"f-note\"><strong>Обозначения:</strong> a, b — стороны; h — высота к стороне a; α — угол между сторонами; d₁, d₂ — диагонали; φ — угол между ними; S — площадь.</span>$P=2(a+b)$ · $S=ah=ab\\sin\\alpha$ · $S=\\frac{1}{2}d_1d_2\\sin\\varphi$ · $d_1^2+d_2^2=2(a^2+b^2)$ · диагонали точкой пересечения делятся пополам.",
      "figure": {"svg": `<svg viewBox="0 0 200 140" role="img" aria-label="Параллелограмм"><g fill="none" stroke="currentColor" stroke-width="1.8"><path d="M35 110 L150 110 L180 40 L65 40 Z"/><path d="M35 110 L180 40 M150 110 L65 40" stroke-width="1.3" stroke-dasharray="5 4"/></g><g fill="currentColor" font-size="11" font-style="italic"><text x="22" y="126">A</text><text x="153" y="126">B</text><text x="183" y="34">C</text><text x="54" y="34">D</text><text x="44" y="102">α</text><text x="92" y="126">a</text><text x="168" y="76">b</text></g></svg>`}
    },
    {
      "title": "Трапеция",
      "text": "<span class=\"f-note\"><strong>Обозначения:</strong> a, b — основания; c — боковая сторона; h — высота; m — средняя линия; S — площадь.</span>$m=\\frac{a+b}{2}$ · $S=mh=\\frac{a+b}{2}h$ · $h=c\\sin\\alpha$ · углы при каждой боковой стороне в сумме $180°$ · в равнобедренной диагонали равны.",
      "figure": {"svg": `<svg viewBox="0 0 200 140" role="img" aria-label="Трапеция"><g fill="none" stroke="currentColor" stroke-width="1.8"><path d="M30 112 L175 112 L140 45 L65 45 Z"/><path d="M65 45 L65 112" stroke-dasharray="5 4"/><path d="M48 79 L158 79" stroke-dasharray="2 4"/></g><g fill="currentColor" font-size="11" font-style="italic"><text x="17" y="128">A</text><text x="178" y="128">B</text><text x="143" y="38">C</text><text x="56" y="38">D</text><text x="96" y="128">a</text><text x="96" y="38">b</text><text x="68" y="80">h</text></g></svg>`}
    },
    {
      "title": "Центральные и вписанные углы",
      "text": "<span class=\"f-note\"><strong>Обозначения:</strong> O — центр; R — радиус; дуга — в градусах; ∠A — вписанный угол; ∠O — центральный.</span>Центральный равен дуге · вписанный равен половине дуги · угол, опирающийся на диаметр, — $90°$ · вписанные углы на одну дугу равны.",
      "figure": {"svg": `<svg viewBox="0 0 200 160" role="img" aria-label="Вписанный и центральный углы"><g fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="100" cy="80" r="50"/><path d="M100 30 L57 105 M100 30 L143 105"/><path d="M100 80 L57 105 M100 80 L143 105" stroke-width="1.3" stroke-dasharray="5 4"/></g><g fill="currentColor" font-size="11" font-style="italic"><text x="94" y="22">A</text><text x="44" y="116">B</text><text x="146" y="116">C</text><text x="104" y="86">O</text></g></svg>`}
    },
    {
      "title": "Касательная, хорда, секущая",
      "text": "<span class=\"f-note\"><strong>Обозначения:</strong> R — радиус; a — хорда; α — половина стягиваемой дуги; PA, PB — расстояния по секущей; T — точка касания.</span>Касательная перпендикулярна радиусу · отрезки касательных из одной точки равны · $a=2R\\sin\\alpha$ · хорды: $AM\\cdot MB=CM\\cdot MD$ · секущие: $PA\\cdot PB=PC\\cdot PD$; $PT^2=PA\\cdot PB$.",
      "figure": {"svg": `<svg viewBox="0 0 200 160" role="img" aria-label="Хорда и касательная"><g fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="105" cy="80" r="45"/><path d="M65 70 L145 70"/><path d="M45 125 L165 125"/><path d="M25 25 L105 125" stroke-dasharray="5 4"/></g><g fill="currentColor" font-size="11" font-style="italic"><text x="56" y="64">A</text><text x="148" y="64">B</text><text x="99" y="140">T</text><text x="12" y="22">P</text></g></svg>`}
    },
    {
      "title": "Вписанная окружность",
      "text": "<span class=\"f-note\"><strong>Обозначения:</strong> r — радиус вписанной; p — полупериметр; S — площадь; a, b, c — стороны.</span>Центр — пересечение биссектрис · $S=pr$ · для прямоугольного $r=\\frac{a+b-c}{2}$ · для равностороннего $r=\\frac{a\\sqrt3}{6}$ · в описанном четырёхугольнике $AB+CD=BC+AD$.",
      "figure": {"svg": `<svg viewBox="0 0 200 150" role="img" aria-label="Треугольник с вписанной окружностью"><g fill="none" stroke="currentColor" stroke-width="1.8"><path d="M40 120 L160 120 L100 40 Z"/><circle cx="100" cy="90" r="30"/><path d="M100 90 L100 120" stroke-width="1.3" stroke-dasharray="4 3"/></g><g fill="currentColor" font-size="11" font-style="italic"><text x="29" y="136">A</text><text x="163" y="136">B</text><text x="94" y="34">C</text><text x="106" y="110">r</text></g></svg>`}
    },
    {
      "title": "Описанная окружность",
      "text": "<span class=\"f-note\"><strong>Обозначения:</strong> R — радиус описанной; a — сторона; A — противолежащий угол; S — площадь; d — диаметр.</span>Центр — пересечение серединных перпендикуляров · $\\frac{a}{\\sin A}=2R=d$ · $R=\\frac{abc}{4S}$ · для прямоугольного $R=\\frac{c}{2}$ · во вписанном четырёхугольнике противоположные углы в сумме $180°$.",
      "figure": {"svg": `<svg viewBox="0 0 200 175" role="img" aria-label="Треугольник с описанной окружностью"><g fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="100" cy="102" r="63"/><path d="M40 120 L160 120 L100 40 Z"/><path d="M100 102 L100 40" stroke-width="1.3" stroke-dasharray="4 3"/></g><g fill="currentColor" font-size="11" font-style="italic"><text x="29" y="136">A</text><text x="163" y="136">B</text><text x="94" y="34">C</text><text x="106" y="70">R</text></g></svg>`}
    }
  ],
  "steps": [
    "Определи тип фигуры из условия и открой её карточку в шпаргалке.",
    "Проверь по обозначениям, что именно дано и что ищут.",
    "Выбери формулу, где ровно одна неизвестная.",
    "Подставь числа по действиям: отдельно числитель, отдельно знаменатель.",
    "Проверь ответ: катет меньше гипотенузы, площадь положительна, угол меньше $180°$."
  ],
  "practices": [
    {
      "text": "В четырёхугольник $ABCD$, периметр которого равен 22, вписана окружность, $AB = 8$. Найдите длину стороны $CD$.",
      "hint": "В описанном четырёхугольнике суммы противоположных сторон равны.",
      "answer": "3",
      "accepted": ["3"],
      "explanation": "$AB+CD = 22/2 = 11$, откуда $CD = 11-8 = 3$.",
      "figure": {"svg": `<svg viewBox="0 0 240 155" role="img" aria-label="Четырёхугольник ABCD с вписанной окружностью"><g fill="none" stroke="currentColor" stroke-width="1.8"><path d="M55 40 L195 46 L185 122 L45 114 Z"/><circle cx="120" cy="81" r="34"/></g><g fill="currentColor" font-size="11" font-style="italic"><text x="44" y="34">A</text><text x="198" y="40">B</text><text x="188" y="136">C</text><text x="34" y="128">D</text><text x="118" y="34">8</text></g></svg>`}
    },
    {
      "text": "Площадь треугольника $ABC$ равна 60, $DE$ — средняя линия, параллельная стороне $AB$. Найдите площадь трапеции $ABED$.",
      "hint": "Средняя линия отсекает треугольник, подобный исходному, с коэффициентом $\\frac{1}{2}$.",
      "answer": "45",
      "accepted": ["45"],
      "explanation": "$S_{CDE} = 60 \\cdot \\frac{1}{4} = 15$, тогда $S_{ABED} = 60-15 = 45$.",
      "figure": {"svg": `<svg viewBox="0 0 240 155" role="img" aria-label="Треугольник ABC со средней линией DE"><g fill="none" stroke="currentColor" stroke-width="1.8"><path d="M35 122 L205 122 L120 35 Z"/><path d="M77.5 78.5 L162.5 78.5"/><path d="M35 122 L77.5 78.5 L162.5 78.5 L205 122 Z" fill="currentColor" fill-opacity="0.06" stroke="none"/></g><g fill="currentColor" font-size="11" font-style="italic"><text x="24" y="138">A</text><text x="208" y="138">B</text><text x="114" y="28">C</text><text x="60" y="74">D</text><text x="167" y="74">E</text></g></svg>`}
    },
    {
      "text": "В треугольнике $ABC$ угол $C$ равен $54°$, $AD$ — биссектриса, угол $BAD$ равен $23°$. Найдите величину угла $ADB$. Ответ дайте в градусах.",
      "hint": "Угол $ADB$ — внешний для треугольника $ADC$.",
      "answer": "77",
      "accepted": ["77"],
      "explanation": "∠DAC = ∠BAD = 23°, ∠C = 54°, значит ∠ADB = 23° + 54° = 77°.",
      "figure": {"svg": `<svg viewBox="0 0 240 155" role="img" aria-label="Треугольник ABC с биссектрисой AD"><g fill="none" stroke="currentColor" stroke-width="1.8"><path d="M30 122 L210 122 L95 35 Z"/><path d="M30 122 L120 54" stroke-dasharray="5 4"/></g><g fill="currentColor" font-size="11" font-style="italic"><text x="18" y="138">A</text><text x="213" y="138">B</text><text x="88" y="28">C</text><text x="124" y="48">D</text></g></svg>`}
    }
  ]
};
