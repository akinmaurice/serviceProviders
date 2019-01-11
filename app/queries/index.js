const queries = {
    getServiceProvidersByLocation: `
        SELECT * FROM service_providers WHERE location = ?
   `,
    getServiceProvidersByService: `
        SELECT * FROM service_providers WHERE service = ?
   `,
    getServiceProviderById: `
        SELECT * FROM service_providers WHERE id = ?
   `,
    getServiceProviderByEmail: `
        SELECT * FROM service_providers WHERE email = ?
   `,
    getServiceProviderByPhone: `
        SELECT * FROM service_providers WHERE phone = ?
   `,
    createServiceProvider: `
        INSERT INTO service_providers(id, name, phone_number, email, service, description, rate, location)
        VALUES(?, ?, ?, ?, ?, ?, ?, ?)
   `,
    updateServiceProvider: `
        UPDATE service_providers
        SET
          name = ?,
          phone_number = ?,
          service = ?,
          description = ?,
          rate = ?,
          location = ?
        WHERE
          id = ?
   `,
    deleteServiceProvider: `
        DELETE service_providers WHERE id = ?
   `,
    getServiceByTitle: `
        SELECT * FROM services WHERE service_title = ?
   `,
    getAllServices: `
        SELECT * FROM services
    `,
    createService: `
        INSERT INTO services(id, service_title, description, created_at, updated_at)
        VALUES(?, ?, ?, ?, ?)
    `
};

module.exports = queries;
