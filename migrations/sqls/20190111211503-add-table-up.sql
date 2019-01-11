/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS services (
  id VARCHAR(50) UNIQUE NOT NULL PRIMARY KEY,
  service_title VARCHAR(50) NOT NULL,
  description VARCHAR(2000),
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL
);


CREATE TABLE IF NOT EXISTS providers (
  id VARCHAR(50) UNIQUE NOT NULL PRIMARY KEY,
  full_name VARCHAR(50) NOT NULL,
  phone VARCHAR(15)  UNIQUE NOT NULL,
  email VARCHAR(50) UNIQUE NOT NULL,
  city_location VARCHAR(20) NOT NULL,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL
);


create TABLE IF NOT EXISTS provider_services (
  id VARCHAR(50) UNIQUE NOT NULL PRIMARY KEY,
  provider_id VARCHAR(50) NOT NULL,
  service_id VARCHAR(50) NOT NULL,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  FOREIGN KEY (provider_id) REFERENCES providers(id)
  FOREIGN KEY (service_id) REFERENCES services(id)
);