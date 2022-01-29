class TXCalendar {
    static monthName = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ]

    root() {
        return this.parent
    }

    constructor() {
        this.parent = this.render()
        this.parent.classList.add("tx-calendar")
        // this isn't stable; doesn't use localtime?
        // Spectrum has tooltips like "Friday, August 5, 2017"
        this.now = new Date()
        this.year = this.now.getFullYear()
        this.month = this.now.getMonth()

        this.button[0].onclick = () => {
            --this.month
            if (this.month < 0) {
                --this.year
                this.month = 11
            }
            this.update()
        }
        this.button[1].onclick = () => {
            ++this.month
            if (this.month > 11) {
                ++this.year
                this.month = 0
            }
            this.update()
        }
        this.update()
    }

    render() {
        this.button = new Array(2)
        return div(
            div(
                this.title = div(),
                array(2, (i) =>
                    this.button[i] = button(
                        svg("#chevron")
                    )),
            ),
            table(
                thead(
                    tr(
                        th("SUN"),
                        th("MON"),
                        th("TUE"),
                        th("WED"),
                        th("THU"),
                        th("FRI"),
                        th("SAT")
                    )
                ),
                this.body = tbody(
                    array(6, () => tr(
                        array(7, () => td(span()))
                    ))
                )
            )
        )
    }

    update() {
        let today
        if (this.month == this.now.getMonth() && this.year == this.now.getFullYear()) {
            today = this.now.getDate()
        }

        let firstDay = new Date(this.year, this.month, 1, 0, 0, 0).getDay()
        let lastDay = new Date(this.year, this.month + 1, 0, 0, 0, 0).getDate()

        this.title.innerText = TXCalendar.monthName[this.month] + " " + this.year

        let dayOfMonth = 1
        for (let row = 0; row < 6; ++row) {
            for (let col = 0; col < 7; ++col) {
                const span = this.body.children[row].children[col].children[0]
                let text = ''
                let isToday = false
                if (!(row === 0 && col < firstDay) && dayOfMonth <= lastDay) {
                    // if (dayOfMonth == 8) {
                    //     text = '<span class="tx-selected">' + dayOfMonth + '</span>'
                    // } else

                    if (dayOfMonth == today) {
                        isToday = true
                    }
                    text = dayOfMonth++
                }
                if (isToday)
                    span.classList.add("tx-today")
                else
                    span.classList.remove("tx-today")
                span.innerText = text
            }
        }
    }
}

function txCalendar() {
    document.body.appendChild(new TXCalendar().root())
}