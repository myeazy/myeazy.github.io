window.EAZY_CONTENT = window.EAZY_CONTENT || {};
window.EAZY_CONTENT[1] = {
  "intro": "Планиметрия — девять типов задач №1. У каждого в шпаргалке есть чертёж и формулы, а в полном разборе — пример из КИМ с решением.",
  "theory": "Задание 1 — планиметрия: треугольники, параллелограмм, трапеция, окружности. Сначала определи тип фигуры из условия, потом открой её карточку в шпаргалке. Задачи одношаговые: всё решает правильно выбранная формула.",
  "formulas": [
    {
      "title": "Прямоугольный треугольник",
      "text": "$c^2 = a^2 + b^2$; $\\sin A = \\frac{a}{c}$; $h_c = \\frac{ab}{c}$; медиана к гипотенузе $\\frac{c}{2}$.",
      "figure": {"svg": `<svg viewBox="0 0 200 150" role="img" aria-label="Прямоугольный треугольник"><g fill="none" stroke="currentColor" stroke-width="1.8"><path d="M25 120 L175 120 L25 30 Z"/><path d="M25 106 L39 106 L39 120" stroke-width="1.2"/></g><g fill="currentColor" font-size="11" font-style="italic"><text x="14" y="136">A</text><text x="178" y="136">B</text><text x="14" y="24">C</text><text x="100" y="136">a</text><text x="12" y="80">b</text><text x="104" y="70">c</text></g></svg>`}
    },
    {
      "title": "Равнобедренный треугольник",
      "text": "Высота к основанию — медиана и биссектриса: $AB = 2\\sqrt{AC^2-h^2}$, $S = \\frac{1}{2}AB \\cdot h$.",
      "figure": {"svg": `<svg viewBox="0 0 200 150" role="img" aria-label="Равнобедренный треугольник"><g fill="none" stroke="currentColor" stroke-width="1.8"><path d="M30 120 L170 120 L100 30 Z"/><path d="M100 30 L100 120" stroke-dasharray="5 4"/><path d="M100 106 L114 106 L114 120" stroke-width="1.2"/></g><g fill="currentColor" font-size="11" font-style="italic"><text x="19" y="136">A</text><text x="173" y="136">B</text><text x="94" y="24">C</text><text x="106" y="80">h</text></g></svg>`}
    },
    {
      "title": "Треугольник общего вида",
      "text": "$S = \\frac{1}{2}ah = \\frac{1}{2}ab\\sin C$; Герон: $S = \\sqrt{p(p-a)(p-b)(p-c)}$.",
      "figure": {"svg": `<svg viewBox="0 0 200 150" role="img" aria-label="Треугольник общего вида"><g fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20 120 L180 120 L130 30 Z"/><path d="M130 30 L130 120" stroke-dasharray="5 4"/><path d="M130 106 L144 106 L144 120" stroke-width="1.2"/></g><g fill="currentColor" font-size="11" font-style="italic"><text x="8" y="136">A</text><text x="183" y="136">B</text><text x="123" y="22">C</text><text x="134" y="136">a</text><text x="134" y="80">h</text></g></svg>`}
    },
    {
      "title": "Параллелограмм",
      "text": "$P = 2(a+b)$; $S = ah = ab\\sin\\alpha$; $S = \\frac{1}{2}d_1d_2\\sin\\varphi$.",
      "figure": {"svg": `<svg viewBox="0 0 200 140" role="img" aria-label="Параллелограмм"><g fill="none" stroke="currentColor" stroke-width="1.8"><path d="M35 110 L150 110 L180 40 L65 40 Z"/><path d="M35 110 L180 40 M150 110 L65 40" stroke-width="1.3" stroke-dasharray="5 4"/></g><g fill="currentColor" font-size="11" font-style="italic"><text x="22" y="126">A</text><text x="153" y="126">B</text><text x="183" y="34">C</text><text x="54" y="34">D</text><text x="44" y="102">α</text></g></svg>`}
    },
    {
      "title": "Трапеция",
      "text": "$m = \\frac{a+b}{2}$; $S = mh = \\frac{a+b}{2}h$. Углы при боковой стороне — $180°$.",
      "figure": {"svg": `<svg viewBox="0 0 200 140" role="img" aria-label="Трапеция"><g fill="none" stroke="currentColor" stroke-width="1.8"><path d="M30 112 L175 112 L140 45 L65 45 Z"/><path d="M65 45 L65 112" stroke-dasharray="5 4"/></g><g fill="currentColor" font-size="11" font-style="italic"><text x="17" y="128">A</text><text x="178" y="128">B</text><text x="143" y="38">C</text><text x="56" y="38">D</text><text x="96" y="128">a</text><text x="96" y="38">b</text><text x="68" y="80">h</text></g></svg>`}
    },
    {
      "title": "Центральные и вписанные углы",
      "text": "Центральный равен дуге, вписанный — её половине. Угол, опирающийся на диаметр, — $90°$.",
      "figure": {"svg": `<svg viewBox="0 0 200 160" role="img" aria-label="Вписанный и центральный углы"><g fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="100" cy="80" r="50"/><path d="M100 30 L57 105 M100 30 L143 105"/><path d="M100 80 L57 105 M100 80 L143 105" stroke-width="1.3" stroke-dasharray="5 4"/></g><g fill="currentColor" font-size="11" font-style="italic"><text x="94" y="22">A</text><text x="44" y="116">B</text><text x="146" y="116">C</text><text x="104" y="86">O</text></g></svg>`}
    },
    {
      "title": "Касательная, хорда, секущая",
      "text": "Касательная ⟂ радиусу; отрезки касательных равны; хорда $a = 2R\\sin\\alpha$; $PA \\cdot PB = PC \\cdot PD$.",
      "figure": {"svg": `<svg viewBox="0 0 200 160" role="img" aria-label="Хорда и касательная"><g fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="105" cy="80" r="45"/><path d="M65 70 L145 70"/><path d="M45 125 L165 125"/><path d="M25 25 L105 125" stroke-dasharray="5 4"/></g><g fill="currentColor" font-size="11" font-style="italic"><text x="56" y="64">A</text><text x="148" y="64">B</text><text x="99" y="140">T</text><text x="12" y="22">P</text></g></svg>`}
    },
    {
      "title": "Вписанная окружность",
      "text": "$S = pr$; для прямоугольного $r = \\frac{a+b-c}{2}$; для равностороннего $r = \\frac{a\\sqrt3}{6}$.",
      "figure": {"svg": `<svg viewBox="0 0 200 150" role="img" aria-label="Треугольник с вписанной окружностью"><g fill="none" stroke="currentColor" stroke-width="1.8"><path d="M40 120 L160 120 L100 40 Z"/><circle cx="100" cy="90" r="30"/><path d="M100 90 L100 120" stroke-width="1.3" stroke-dasharray="4 3"/></g><g fill="currentColor" font-size="11" font-style="italic"><text x="29" y="136">A</text><text x="163" y="136">B</text><text x="94" y="34">C</text><text x="106" y="110">r</text></g></svg>`}
    },
    {
      "title": "Описанная окружность",
      "text": "$\\frac{a}{\\sin A} = 2R$; $R = \\frac{abc}{4S}$; для прямоугольного $R = \\frac{c}{2}$.",
      "figure": {"svg": `<svg viewBox="0 0 200 175" role="img" aria-label="Треугольник с описанной окружностью"><g fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="100" cy="102" r="63"/><path d="M40 120 L160 120 L100 40 Z"/><path d="M100 102 L100 40" stroke-width="1.3" stroke-dasharray="4 3"/></g><g fill="currentColor" font-size="11" font-style="italic"><text x="29" y="136">A</text><text x="163" y="136">B</text><text x="94" y="34">C</text><text x="106" y="70">R</text></g></svg>`}
    }
  ],
  "steps": [
    "Определи тип фигуры из условия и открой его карточку в шпаргалке.",
    "Выпиши данные и искомое в одну строку — защищает от подмены.",
    "Выбери формулу, где ровно одна неизвестная.",
    "Подставь числа по действиям: отдельно числитель, отдельно знаменатель.",
    "Проверь ответ: катет меньше гипотенузы, площадь положительна, угол меньше $180°$."
  ],
  "examples": [
    {
      "title": "Прямоугольный треугольник",
      "text": "Гипотенуза прямоугольного треугольника равна 25, один из катетов равен 7. Найдите площадь треугольника.",
      "solution": "Второй катет: $\\sqrt{25^2-7^2} = 24$. Площадь: $S = \\frac{1}{2} \\cdot 7 \\cdot 24 = 84$.",
      "answer": "84",
      "figure": {"svg": `<svg viewBox="0 0 240 150" role="img" aria-label="Прямоугольный треугольник"><g fill="none" stroke="currentColor" stroke-width="1.8"><path d="M35 120 L200 120 L35 35 Z"/><path d="M35 106 L49 106 L49 120" stroke-width="1.2"/></g><g fill="currentColor" font-size="11" font-style="italic"><text x="24" y="136">A</text><text x="204" y="136">B</text><text x="24" y="28">C</text><text x="112" y="136">24</text><text x="22" y="82">7</text><text x="126" y="70">25</text></g></svg>`}
    },
    {
      "title": "Равнобедренный треугольник",
      "text": "В равнобедренном треугольнике боковая сторона равна 13, основание равно 10. Найдите высоту, проведённую к основанию.",
      "solution": "Высота делит основание пополам: половина — 5. Тогда $h = \\sqrt{13^2-5^2} = 12$.",
      "answer": "12",
      "figure": {"svg": `<svg viewBox="0 0 240 150" role="img" aria-label="Равнобедренный треугольник"><g fill="none" stroke="currentColor" stroke-width="1.8"><path d="M40 120 L200 120 L120 30 Z"/><path d="M120 30 L120 120" stroke-dasharray="5 4"/><path d="M120 106 L134 106 L134 120" stroke-width="1.2"/></g><g fill="currentColor" font-size="11" font-style="italic"><text x="29" y="136">A</text><text x="203" y="136">B</text><text x="114" y="24">C</text><text x="126" y="80">h</text></g></svg>`}
    },
    {
      "title": "Треугольник общего вида",
      "text": "Стороны треугольника равны 13, 14 и 15. Найдите его площадь.",
      "solution": "Полупериметр $p = 21$. По формуле Герона: $S = \\sqrt{21 \\cdot 8 \\cdot 7 \\cdot 6} = \\sqrt{7056} = 84$.",
      "answer": "84",
      "figure": {"svg": `<svg viewBox="0 0 240 150" role="img" aria-label="Треугольник общего вида"><g fill="none" stroke="currentColor" stroke-width="1.8"><path d="M25 120 L215 120 L150 30 Z"/><path d="M150 30 L150 120" stroke-dasharray="5 4"/></g><g fill="currentColor" font-size="11" font-style="italic"><text x="13" y="136">A</text><text x="218" y="136">B</text><text x="143" y="22">C</text><text x="154" y="80">h</text></g></svg>`}
    },
    {
      "title": "Параллелограмм",
      "text": "Стороны параллелограмма равны 6 и 8, угол между ними $30°$. Найдите площадь параллелограмма.",
      "solution": "$S = ab\\sin\\alpha = 6 \\cdot 8 \\cdot \\frac{1}{2} = 24$.",
      "answer": "24",
      "figure": {"svg": `<svg viewBox="0 0 240 140" role="img" aria-label="Параллелограмм"><g fill="none" stroke="currentColor" stroke-width="1.8"><path d="M40 110 L175 110 L210 45 L75 45 Z"/><path d="M40 110 L210 45" stroke-width="1.3" stroke-dasharray="5 4"/></g><g fill="currentColor" font-size="11" font-style="italic"><text x="27" y="126">A</text><text x="178" y="126">B</text><text x="213" y="38">C</text><text x="64" y="38">D</text><text x="49" y="102">30°</text></g></svg>`}
    },
    {
      "title": "Трапеция",
      "text": "Средняя линия трапеции равна 7, высота равна 4. Найдите площадь трапеции.",
      "solution": "Площадь трапеции равна произведению средней линии на высоту: $S = 7 \\cdot 4 = 28$.",
      "answer": "28",
      "figure": {"svg": `<svg viewBox="0 0 240 140" role="img" aria-label="Трапеция"><g fill="none" stroke="currentColor" stroke-width="1.8"><path d="M35 112 L205 112 L165 45 L75 45 Z"/><path d="M75 45 L75 112" stroke-dasharray="5 4"/><path d="M55 79 L185 79" stroke-dasharray="2 4"/></g><g fill="currentColor" font-size="11" font-style="italic"><text x="22" y="128">A</text><text x="208" y="128">B</text><text x="168" y="38">C</text><text x="66" y="38">D</text><text x="116" y="128">a</text><text x="116" y="38">b</text><text x="78" y="80">h</text></g></svg>`}
    },
    {
      "title": "Центральные и вписанные углы",
      "text": "Вписанный угол опирается на дугу, равную $120°$. Найдите величину этого угла.",
      "solution": "Вписанный угол равен половине дуги: $120° / 2 = 60°$.",
      "answer": "60",
      "figure": {"svg": `<svg viewBox="0 0 240 165" role="img" aria-label="Вписанный угол"><g fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="120" cy="82" r="55"/><path d="M120 27 L70 112 M120 27 L170 112"/><path d="M120 82 L70 112 M120 82 L170 112" stroke-width="1.2" stroke-dasharray="5 4"/></g><g fill="currentColor" font-size="11" font-style="italic"><text x="114" y="20">A</text><text x="58" y="126">B</text><text x="172" y="126">C</text><text x="124" y="88">O</text></g></svg>`}
    },
    {
      "title": "Касательная, хорда, секущая",
      "text": "Радиус окружности равен 12. Хорда стягивает дугу $60°$. Найдите длину хорды.",
      "solution": "Половина дуги — $30°$. Хорда: $a = 2R\\sin 30° = 2 \\cdot 12 \\cdot 0{,}5 = 12$.",
      "answer": "12",
      "figure": {"svg": `<svg viewBox="0 0 240 160" role="img" aria-label="Хорда окружности"><g fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="120" cy="80" r="55"/><path d="M120 25 L72 108 M120 25 L168 108"/></g><g fill="currentColor" font-size="11" font-style="italic"><text x="70" y="122">A</text><text x="168" y="122">B</text><text x="114" y="18">O</text></g></svg>`}
    },
    {
      "title": "Вписанная окружность",
      "text": "Площадь треугольника равна 84, его полупериметр равен 21. Найдите радиус вписанной окружности.",
      "solution": "$r = \\frac{S}{p} = \\frac{84}{21} = 4$.",
      "answer": "4",
      "figure": {"svg": `<svg viewBox="0 0 240 150" role="img" aria-label="Вписанная окружность"><g fill="none" stroke="currentColor" stroke-width="1.8"><path d="M50 120 L190 120 L120 35 Z"/><circle cx="120" cy="94" r="26"/><path d="M120 94 L120 120" stroke-width="1.3" stroke-dasharray="4 3"/></g><g fill="currentColor" font-size="11" font-style="italic"><text x="38" y="136">A</text><text x="193" y="136">B</text><text x="114" y="28">C</text><text x="126" y="110">r</text></g></svg>`}
    },
    {
      "title": "Описанная окружность",
      "text": "Сторона треугольника равна 8, а противолежащий ей угол равен $30°$. Найдите радиус описанной окружности.",
      "solution": "По теореме синусов $\\frac{a}{\\sin A} = 2R$, значит $2R = \\frac{8}{0{,}5} = 16$, откуда $R = 8$.",
      "answer": "8",
      "figure": {"svg": `<svg viewBox="0 0 240 150" role="img" aria-label="Описанная окружность"><g fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="120" cy="86" r="52"/><path d="M50 120 L190 120 L120 35 Z"/></g><g fill="currentColor" font-size="11" font-style="italic"><text x="38" y="136">A</text><text x="193" y="136">B</text><text x="114" y="28">C</text><text x="126" y="78">R</text></g></svg>`}
    }
  ],
  "practices": [
    {
      "text": "В четырёхугольник $ABCD$, периметр которого равен 22, вписана окружность, $AB = 8$. Найдите длину стороны $CD$.",
      "hint": "В описанном четырёхугольнике суммы противоположных сторон равны.",
      "answer": "3",
      "accepted": ["3"],
      "explanation": "$AB+CD = 22/2 = 11$, откуда $CD = 3$.",
      "figure": {"svg": `<svg viewBox="0 0 240 150" role="img" aria-label="Описанный четырёхугольник"><g fill="none" stroke="currentColor" stroke-width="1.8"><path d="M55 40 L195 46 L185 120 L45 112 Z"/><circle cx="120" cy="80" r="33"/></g><g fill="currentColor" font-size="11" font-style="italic"><text x="44" y="34">A</text><text x="198" y="40">B</text><text x="188" y="134">C</text><text x="34" y="126">D</text></g></svg>`}
    },
    {
      "text": "Площадь треугольника $ABC$ равна 60, $DE$ — средняя линия, параллельная $AB$. Найдите площадь трапеции $ABED$.",
      "hint": "Средняя линия отсекает треугольник с коэффициентом подобия $\\frac{1}{2}$.",
      "answer": "45",
      "accepted": ["45"],
      "explanation": "$S_{CDE} = 60/4 = 15$, тогда $S_{ABED} = 45$.",
      "figure": {"svg": `<svg viewBox="0 0 240 150" role="img" aria-label="Средняя линия треугольника"><g fill="none" stroke="currentColor" stroke-width="1.8"><path d="M35 120 L205 120 L120 35 Z"/><path d="M77.5 77.5 L162.5 77.5"/></g><g fill="currentColor" font-size="11" font-style="italic"><text x="24" y="136">A</text><text x="208" y="136">B</text><text x="114" y="28">C</text><text x="60" y="73">D</text><text x="167" y="73">E</text></g></svg>`}
    },
    {
      "text": "В треугольнике $ABC$ угол $C$ равен $54°$, $AD$ — биссектриса, угол $BAD$ равен $23°$. Найдите величину угла $ADB$. Ответ дайте в градусах.",
      "hint": "Угол $ADB$ — внешний для треугольника $ADC$.",
      "answer": "77",
      "accepted": ["77"],
      "explanation": "∠DAC = 23°, ∠C = 54°, значит ∠ADB = 77°.",
      "figure": {"svg": `<svg viewBox="0 0 240 150" role="img" aria-label="Биссектриса треугольника"><g fill="none" stroke="currentColor" stroke-width="1.8"><path d="M30 120 L210 120 L95 35 Z"/><path d="M30 120 L120 52" stroke-dasharray="5 4"/></g><g fill="currentColor" font-size="11" font-style="italic"><text x="18" y="136">A</text><text x="213" y="136">B</text><text x="88" y="28">C</text><text x="124" y="46">D</text></g></svg>`}
    },
    {
      "text": "Вписанный угол окружности опирается на дугу в $80°$. Найдите этот угол.",
      "hint": "Сравни вписанный угол с дугой, на которую он опирается.",
      "answer": "40",
      "accepted": ["40"],
      "explanation": "Вписанный угол — половина дуги: $80°/2 = 40°$.",
      "figure": {"svg": `<svg viewBox="0 0 240 165" role="img" aria-label="Вписанный угол"><g fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="120" cy="82" r="55"/><path d="M120 27 L70 112 M120 27 L170 112"/><path d="M120 82 L70 112 M120 82 L170 112" stroke-width="1.2" stroke-dasharray="5 4"/></g><g fill="currentColor" font-size="11" font-style="italic"><text x="114" y="20">A</text><text x="58" y="126">B</text><text x="172" y="126">C</text><text x="124" y="88">O</text></g></svg>`}
    }
  ]
};
