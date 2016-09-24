class ClassBill {
    constructor(data = {}) {
        this.date_due = '';
        this.name = '';
        this.value = 0;
        this.done = false;
        Object.assign(this, data);
    }

    toJSON() {
        let _date_due = this.date_due;
        if(_date_due.length > 10){
            this.date_due = _date_due.substring(0,10);
        }

        return {
            date_due: this.date_due,
            name: this.name,
            value: this.value,
            done: this.done
        }
    }
}