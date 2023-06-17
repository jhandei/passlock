export default class PasswordModel{
    constructor() {
        this.username = "",
        this.website = "",
        this.password = ""
    }

    isEmpty() {
        return this.username != "";
    }
}