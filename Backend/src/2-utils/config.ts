class Config {
    public port = process.env.PORT || 3001;
    public mysqlHost = "localhost";
    public mysqlUser = "root";
    public mysqlPassword = "";
    public mysqlDatabase = "Vacations" // Must fill in...
}

const config = new Config();

export default config;