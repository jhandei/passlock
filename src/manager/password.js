class PasswordModel{
    username;
    website;
    password;

    constructor(data) {
        this.username = data.username;
        this.website = data.website;
        this.password = data.password;
    }

    isEmpty() {
        return this.username != "";
    }
}

export {PasswordModel}