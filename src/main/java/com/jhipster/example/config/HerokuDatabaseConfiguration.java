package com.jhipster.example.config;

import javax.sql.DataSource;

import org.apache.commons.dbcp.BasicDataSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration
@Profile(Constants.SPRING_PROFILE_HEROKU)
public class HerokuDatabaseConfiguration {

    private final Logger log = LoggerFactory.getLogger(HerokuDatabaseConfiguration.class);

    @Bean
    public DataSource dataSource(DataSourceProperties dataSourceProperties, JHipsterProperties jHipsterProperties) {
        log.debug("Configuring Heroku Datasource");

//        String herokuUrl = System.getenv("JDBC_DATABASE_URL");
//        if (herokuUrl != null) {
//	    HikariConfig config = new HikariConfig();
//
//	    //MySQL optimizations, see https://github.com/brettwooldridge/HikariCP/wiki/MySQL-Configuration
//	    if ("com.mysql.jdbc.jdbc2.optional.MysqlDataSource".equals(dataSourceProperties.getDriverClassName())) {
//                config.addDataSourceProperty("cachePrepStmts", jHipsterProperties.getDatasource().isCachePrepStmts());
//                config.addDataSourceProperty("prepStmtCacheSize", jHipsterProperties.getDatasource().getPrepStmtCacheSize());
//                config.addDataSourceProperty("prepStmtCacheSqlLimit", jHipsterProperties.getDatasource().getPrepStmtCacheSqlLimit());
//            }
//
//            config.setDataSourceClassName(dataSourceProperties.getDriverClassName());
//            config.addDataSourceProperty("url", herokuUrl);
//            return new HikariDataSource(config);
//        } else {
//            throw new ApplicationContextException("Heroku database URL is not configured, you must set $JDBC_DATABASE_URL");
//        }
//        
        
        
        String dbUrl = "jdbc:postgresql://ec2-79-125-118-3.eu-west-1.compute.amazonaws.com:5432/d7re5sclfapaj3?sslmode=verify-full";
        String username = "hxapqbslqizfiq";
        String password = "oNB3TM3pZ_xH-nu_sor40f0JHa";

        BasicDataSource basicDataSource = new BasicDataSource();
        basicDataSource.setUrl(dbUrl);
        basicDataSource.setUsername(username);
        basicDataSource.setPassword(password);

        return basicDataSource;
        
       
    }
}
