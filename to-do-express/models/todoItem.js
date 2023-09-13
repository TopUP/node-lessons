class TodoItem {

    constructor(content, done, date) {
        this.content    = content;
        this.done       = done;
        this.date       = date;
    }

    static async all() {
        console.log('all');

    }

    static async getById(id) {
        console.log('getById');

        return null;
    }

    async async save() {
        console.log('save');

    }

    static async update(data) {
        console.log('update');

    }

    static async destroy() {
        console.log('destroy');

    }

    static async toggleDone() {
        console.log('toggleDone');

    }

}

module.exports = TodoItem
