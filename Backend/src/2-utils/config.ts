class Config {
    public port = process.env.PORT || 3001;
    public mysqlHost = "db4free.net";
    public mysqlUser = "vacationproj";
    public mysqlPassword = "adminadmin";
    public mysqlDatabase = "vacationproj" // Must fill in...
}

const config = new Config();

export default config;