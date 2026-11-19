window.EAZY_CONTENT = window.EAZY_CONTENT || {};
window.EAZY_CONTENT[1] = {
  "intro": "Планиметрия — всё про фигуры на плоскости. Девять типов задач, которые встречаются в №1: у каждого свой чертёж и свои формулы.",
  "theory": "Задание 1 — планиметрия: треугольники, параллелограммы, трапеции, окружности. Сначала определи тип фигуры из условия, потом открой её карточку — в шпаргалке у каждого типа есть чертёж и формулы. Одношаговые задачи, но требуют точной формулы.",
  "formulas": [
    {
      "title": "Прямоугольный треугольник",
      "text": "$c^2 = a^2 + b^2$; $\\sin A = \\frac{a}{c}$; $h_c = \\frac{ab}{c}$; медиана к гипотенузе $= \\frac{c}{2}$.",
      "figure": {"svg": `<svg viewBox="0 0 200 150" role="img" aria-label="Прямоугольный треугольник"><g fill="none" stroke="currentColor" stroke-width="1.8"><path d="M25 120 L175 120 L25 30 Z"/><path d="M25 106 L39 106 L39 120" stroke-width="1.2"/></g><g fill="currentColor" font-size="11" font-style="italic"><text x="14" y="136">A</text><text x="178" y="136">B</text><text x="14" y="24">C</text><text x="100" y="136">a</text><text x="12" y="80">b</text><text x="104" y="70">c</text></g></svg>`}
    },
    {
      "title": "Равнобедренный треугольник",
      "text": "Высота к основанию — медиана и биссектриса. $AB = 2\\sqrt{AC^2 - h^2}$, $S = \\frac{1}{2}AB \\cdot h$.",
      "figure": {"svg": `<svg viewBox="0 0 200 150" role="img" aria-label="Равнобедренный треугольник"><g fill="none" stroke="currentColor" stroke-width="1.8"><path d="M30 120 L170 120 L100 30 Z"/><path d="M100 30 L100 120" stroke-dasharray="5 4"/><path d="M100 106 L114 106 L114 120" stroke-width="1.2"/></g><g fill="currentColor" font-size="11" font-style="italic"><text x="19" y="136">A</text><text x="173" y="136">B</text><text x="94" y="24">C</text><text x="106" y="80">h</text></g></svg>`}
    },
    {
      "title": "Треугольник общего вида",
      "text": "$S = \\frac{1}{2}ah = \\frac{1}{2}ab\\sin C$. Герон: $S = \\sqrt{p(p-a)(p-b)(p-c)}$.",
      "figure": {"svg": `<svg viewBox="0 0 200 150" role="img" aria-label="Треугольник общего вида"><g fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20 120 L180 120 L130 30 Z"/><path d="M130 30 L130 120" stroke-dasharray="5 4"/><path d="M130 106 L144 106 L144 120" stroke-width="1.2"/></g><g fill="currentColor" font-size="11" font-style="italic"><text x="8" y="136">A</text><text x="183" y="136">B</text><text x="123" y="22">C</text><text x="134" y="136">a</text><text x="134" y="80">h</text></g></svg>`}
    },
    {
      "title": "Параллелограмм",
      "text": "$P = 2(a+b)$; $S = ah = ab\\sin\\alpha$; $S = \\frac{1}{2}d_1d_2\\sin\\varphi$. Диагонали делятся пополам.",
      "figure": {"svg": `<svg viewBox="0 0 200 140" role="img" aria-label="Параллелограмм"><g fill="none" stroke="currentColor" stroke-width="1.8"><path d="M35 110 L150 110 L180 40 L65 40 Z"/><path d="M35 110 L180 40 M150 110 L65 40" stroke-width="1.3" stroke-dasharray="5 4"/></g><g fill="currentColor" font-size="11" font-style="italic"><text x="22" y="126">A</text><text x="153" y="126">B</text><text x="183" y="34">C</text><text x="54" y="34">D</text><text x="44" y="102">α</text><text x="104" y="80">O</text></g></svg>`}
    },
    {
      "title": "Трапеция",
      "text": "$m = \\frac{a+b}{2}$; $S = mh = \\frac{a+b}{2}h$; $h = c\\sin\\alpha$. Углы при боковой стороне — $180°$.",
      "figure": {"svg": `<svg viewBox="0 0 200 140" role="img" aria-label="Трапеция"><g fill="none" stroke="currentColor" stroke-width="1.8"><path d="M30 112 L175 112 L140 45 L65 45 Z"/><path d="M65 45 L65 112" stroke-dasharray="5 4"/><path d="M48 79 L158 79" stroke-dasharray="2 4"/></g><g fill="currentColor" font-size="11" font-style="italic"><text x="17" y="128">A</text><text x="178" y="128">B</text><text x="143" y="38">C</text><text x="56" y="38">D</text><text x="96" y="128">a</text><text x="96" y="38">b</text><text x="68" y="80">h</text></g></svg>`}
    },
    {
      "title": "Центральные и вписанные углы",
      "text": "Центральный равен дуге, вписанный — её половине. Угол на диаметр — $90°$.",
      "figure": {"svg": `<svg viewBox="0 0 200 160" role="img" aria-label="Окружность, вписанный и центральный углы"><g fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="100" cy="80" r="50"/><path d="M100 30 L57 105 M100 30 L143 105"/><path d="M100 80 L57 105 M100 80 L143 105" stroke-width="1.3" stroke-dasharray="5 4"/></g><g fill="currentColor" font-size="11" font-style="italic"><text x="94" y="22">A</text><text x="44" y="116">B</text><text x="146" y="116">C</text><text x="104" y="86">O</text></g></svg>`}
    },
    {
      "title": "Касательная, хорда, секущая",
      "text": "Касательная ⟂ радиусу; отрезки касательных из точки равны. Хорда $a = 2R\\sin\\alpha$; секущие: $PA \\cdot PB = PC \\cdot PD$.",
      "figure": {"svg": `<svg viewBox="0 0 200 160" role="img" aria-label="Окружность, хорда и касательная"><g fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="105" cy="80" r="45"/><path d="M65 70 L145 70"/><path d="M45 125 L165 125"/><path d="M25 25 L105 125" stroke-dasharray="5 4"/></g><g fill="currentColor" font-size="11" font-style="italic"><text x="56" y="64">A</text><text x="148" y="64">B</text><text x="99" y="140">T</text><text x="12" y="22">P</text></g></svg>`}
    },
    {
      "title": "Вписанная окружность",
      "text": "$S = pr$; $r = \\frac{a+b-c}{2}$ (прямоуг.); $r = \\frac{a\\sqrt3}{6}$ (равностор.).",
      "figure": {"svg": `<svg viewBox="0 0 200 150" role="img" aria-label="Треугольник с вписанной окружностью"><g fill="none" stroke="currentColor" stroke-width="1.8"><path d="M35 120 L165 120 L100 30 Z"/><circle cx="100" cy="93" r="27"/><path d="M100 93 L100 120" stroke-width="1.3" stroke-dasharray="4 3"/></g><g fill="currentColor" font-size="11" font-style="italic"><text x="24" y="136">A</text><text x="168" y="136">B</text><text x="94" y="24">C</text><text x="106" y="112">r</text></g></svg>`}
    },
    {
      "title": "Описанная окружность",
      "text": "$\\frac{a}{\\sin A} = 2R$; $R = \\frac{abc}{4S}$; $R = \\frac{c}{2}$ для прямоугольного.",
      "figure": {"svg": `<svg viewBox="0 0 200 150" role="img" aria-label="Треугольник с описанной окружностью"><g fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="100" cy="78" r="53"/><path d="M35 120 L165 120 L100 30 Z"/><path d="M100 78 L100 30" stroke-width="1.3" stroke-dasharray="4 3"/></g><g fill="currentColor" font-size="11" font-style="italic"><text x="24" y="136">A</text><text x="168" y="136">B</text><text x="94" y="24">C</text><text x="106" y="56">R</text></g></svg>`}
    }
  ],
  "steps": [
    "Определи тип фигуры из условия — открой её карточку в шпаргалке.",
    "Выпиши данные и искомое в одну строку — это защищает от подмены.",
    "Выбери формулу, в которой есть ровно одна неизвестная.",
    "Подставь числа по действиям: отдельно числитель, отдельно знаменатель.",
    "Проверь здравый смысл: катет меньше гипотенузы, площадь положительна, угол меньше $180°$."
  ],
  "derivation": [
    {
      "title": "Почему вписанный угол — половина дуги",
      "text": "Соединим центр $O$ с точкой $C$ на дуге. Треугольники $AOC$ и $BOC$ равнобедренные ($OA = OC = OB$). Внешний угол равен сумме двух внутренних, поэтому ∠AOC = 2∠ACO. Складывая обе половины: ∠AOB = 2∠ACB. Центральный измеряется дугой — значит вписанный равен её половине."
    },
    {
      "title": "Почему $S = \\frac{1}{2}ab\\sin C$",
      "text": "Опустим высоту $h$ на сторону $a$: в прямоугольном треугольнике $\\sin C = \\frac{h}{b}$, значит $h = b\\sin C$. Площадь — половина основания на высоту: $S = \\frac{1}{2}ah = \\frac{1}{2}ab\\sin C$. При $C=90°$ получаем привычное $\\frac{1}{2}ab$."
    },
    {
      "title": "Почему площадь трапеции — средняя линия на высоту",
      "text": "Две одинаковые трапеции складываются в параллелограмм с основанием $a+b$ и высотой $h$. Его площадь $(a+b)h$, трапеция — половина: $S = \\frac{a+b}{2}h$. Средняя линия $m = \\frac{a+b}{2}$, значит $S = mh$."
    },
    {
      "title": "Почему в описанном четырёхугольнике суммы противоположных сторон равны",
      "text": "Отрезки касательных из одной вершины равны. Пусть из $A$ они равны $x$, из $B$ — $y$, из $C$ — $z$, из $D$ — $t$. Тогда $AB = x+y$, $BC = y+z$, $CD = z+t$, $AD = x+t$. Суммы противоположных сторон: $AB+CD = BC+AD = x+y+z+t$."
    }
  ],
  "examples": [
    {
      "title": "Описанный четырёхугольник",
      "text": "В четырёхугольник $ABCD$, периметр которого равен 28, вписана окружность, $AB = 9$. Найдите $CD$.",
      "solution": "В описанном четырёхугольнике суммы противоположных сторон равны, а периметр — удвоенная такая сумма: $AB+CD = 28/2 = 14$. Значит $CD = 14-9 = 5$.",
      "answer": "5",
      "figure": {"svg": `<svg viewBox="0 0 260 170" role="img" aria-label="Описанный четырёхугольник"><g fill="none" stroke="currentColor" stroke-width="1.8"><path d="M55 40 L215 48 L200 135 L40 125 Z"/><circle cx="128" cy="86" r="38"/></g><g fill="currentColor" font-size="11" font-style="italic"><text x="44" y="34">A</text><text x="218" y="42">B</text><text x="204" y="150">C</text><text x="30" y="140">D</text></g></svg>`}
    },
    {
      "title": "Средняя линия треугольника",
      "text": "Площадь треугольника $ABC$ равна 48, $DE$ — средняя линия, параллельная $AB$. Найдите площадь трапеции $ABED$.",
      "solution": "Средняя линия отсекает треугольник $CDE$, подобный $ABC$ с коэффициентом $1/2$. Его площадь $48 \\cdot \\frac{1}{4} = 12$. Площадь трапеции: $48-12 = 36$.",
      "answer": "36",
      "figure": {"svg": `<svg viewBox="0 0 260 160" role="img" aria-label="Треугольник со средней линией"><g fill="none" stroke="currentColor" stroke-width="1.8"><path d="M35 130 L225 130 L130 35 Z"/><path d="M82.5 82.5 L177.5 82.5"/><path d="M35 130 L82.5 82.5 L177.5 82.5 L225 130 Z" fill="currentColor" fill-opacity="0.08" stroke="none"/></g><g fill="currentColor" font-size="11" font-style="italic"><text x="24" y="146">A</text><text x="228" y="146">B</text><text x="123" y="26">C</text><text x="66" y="78">D</text><text x="182" y="78">E</text></g></svg>`}
    },
    {
      "title": "Биссектриса угла",
      "text": "В треугольнике $ABC$ угол $C$ равен $48°$, $AD$ — биссектриса, угол $BAD$ равен $21°$. Найдите угол $ADB$.",
      "solution": "∠DAC = ∠BAD = $21°$ (биссектриса). Угол $ADB$ — внешний для треугольника $ADC$, значит равен сумме двух внутренних, не смежных с ним: $21° + 48° = 69°$.",
      "answer": "69",
      "figure": {"svg": `<svg viewBox="0 0 260 160" role="img" aria-label="Треугольник с биссектрисой"><g fill="none" stroke="currentColor" stroke-width="1.8"><path d="M30 130 L230 130 L100 35 Z"/><path d="M30 130 L128 50" stroke-dasharray="5 4"/></g><g fill="currentColor" font-size="11" font-style="italic"><text x="18" y="146">A</text><text x="233" y="146">B</text><text x="93" y="26">C</text><text x="132" y="44">D</text></g></svg>`}
    }
  ],
  "example": {
    "text": "В прямоугольном треугольнике катеты равны 3 и 4. Найдите высоту, проведённую к гипотенузе.",
    "solution": "Гипотенуза по Пифагору: $\\sqrt{3^2+4^2}=5$. Высота: $h_c = \\frac{ab}{c} = \\frac{3 \\cdot 4}{5} = 2{,}4$.",
    "answer": "2,4"
  },
  "errors": [
    "Брать синус и косинус, не убедившись, что треугольник прямоугольный.",
    "Путать катеты с гипотенузой в теореме Пифагора.",
    "Забыть половину в площади треугольника или трапеции.",
    "Путать центральный и вписанный угол: вписанный — половина дуги."
  ],
  "practices": [
    {
      "text": "В четырёхугольник $ABCD$, периметр которого равен 22, вписана окружность, $AB = 8$. Найдите длину стороны $CD$.",
      "hint": "В описанном четырёхугольнике суммы противоположных сторон равны.",
      "answer": "3",
      "accepted": ["3"],
      "explanation": "Периметр равен $2(AB+CD)$, значит $AB+CD = 11$, откуда $CD = 3$.",
      "figure": {"svg": `<svg viewBox="0 0 260 170" role="img" aria-label="Четырёхугольник с вписанной окружностью"><g fill="none" stroke="currentColor" stroke-width="1.8"><path d="M55 40 L215 48 L200 135 L40 125 Z"/><circle cx="128" cy="86" r="38"/></g><g fill="currentColor" font-size="11" font-style="italic"><text x="44" y="34">A</text><text x="218" y="42">B</text><text x="204" y="150">C</text><text x="30" y="140">D</text></g></svg>`}
    },
    {
      "text": "Площадь треугольника $ABC$ равна 60, $DE$ — средняя линия, параллельная $AB$. Найдите площадь трапеции $ABED$.",
      "hint": "Средняя линия отсекает треугольник с коэффициентом подобия $\\frac{1}{2}$.",
      "answer": "45",
      "accepted": ["45"],
      "explanation": "$S_{CDE} = 60 \\cdot \\frac{1}{4} = 15$; тогда $S_{ABED} = 60-15 = 45$.",
      "figure": {"svg": `<svg viewBox="0 0 260 160" role="img" aria-label="Треугольник со средней линией"><g fill="none" stroke="currentColor" stroke-width="1.8"><path d="M35 130 L225 130 L130 35 Z"/><path d="M82.5 82.5 L177.5 82.5"/></g><g fill="currentColor" font-size="11" font-style="italic"><text x="24" y="146">A</text><text x="228" y="146">B</text><text x="123" y="26">C</text><text x="66" y="78">D</text><text x="182" y="78">E</text></g></svg>`}
    },
    {
      "text": "В треугольнике $ABC$ угол $C$ равен $54°$, $AD$ — биссектриса, угол $BAD$ равен $23°$. Найдите угол $ADB$. Ответ дайте в градусах.",
      "hint": "Биссектриса делит угол $A$ пополам, а $ADB$ — внешний для треугольника $ADC$.",
      "answer": "77",
      "accepted": ["77"],
      "explanation": "∠DAC = 23°, ∠C = 54°; внешний угол $23°+54° = 77°$.",
      "figure": {"svg": `<svg viewBox="0 0 260 160" role="img" aria-label="Треугольник с биссектрисой"><g fill="none" stroke="currentColor" stroke-width="1.8"><path d="M30 130 L230 130 L100 35 Z"/><path d="M30 130 L128 50" stroke-dasharray="5 4"/></g><g fill="currentColor" font-size="11" font-style="italic"><text x="18" y="146">A</text><text x="233" y="146">B</text><text x="93" y="26">C</text><text x="132" y="44">D</text></g></svg>`}
    },
    {
      "text": "Вписанный угол окружности опирается на дугу в $80°$. Найдите этот угол.",
      "hint": "Сравни вписанный угол с дугой, на которую он опирается.",
      "answer": "40",
      "accepted": ["40"],
      "explanation": "Вписанный угол — половина дуги: $\\frac{80°}{2} = 40°$.",
      "figure": {"svg": `<svg viewBox="0 0 260 170" role="img" aria-label="Окружность и вписанный угол"><g fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="130" cy="85" r="55"/><path d="M130 30 L80 115 M130 30 L180 115"/><path d="M130 85 L80 115 M130 85 L180 115" stroke-width="1.2" stroke-dasharray="5 4"/></g><g fill="currentColor" font-size="11" font-style="italic"><text x="124" y="22">A</text><text x="68" y="128">B</text><text x="182" y="128">C</text><text x="134" y="92">O</text></g></svg>`}
    }
  ]
};
