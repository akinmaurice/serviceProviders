const queries = {
    getProvidersByLocation: `
        SELECT
          providers.full_name,
          providers.email,
          providers.phone,
          providers.city_location,
          services.service_title
        FROM
          providers
        LEFT JOIN provider_services ON provider_services.provider_id = providers.id
        LEFT JOIN services ON provider_services.service_id = services.id
        WHERE
          providers.city_location = ?
   `,
    getProvidersByService: `
        SELECT
        providers.full_name,
        providers.email,
        providers.phone,
        providers.city_location,
        services.service_title
        FROM
          providers
        LEFT JOIN provider_services ON provider_services.provider_id = providers.id
        LEFT JOIN services ON provider_services.service_id = services.id
        WHERE
          services.service_title = ?
   `,
    getProviderById: `
        SELECT * FROM providers WHERE id = ?
   `,
    getProviderByEmail: `
        SELECT * FROM providers WHERE email = ?
   `,
    getProviderByPhone: `
        SELECT * FROM providers WHERE phone = ?
   `,
    createProvider: `
        INSERT INTO providers(id, full_name, phone, email, city_location, created_at, updated_at)
        VALUES(?, ?, ?, ?, ?, ?, ?)
   `,
    createProviderService: `
        INSERT INTO provider_services(id, provider_id, service_id, created_at, updated_at)
        VALUES(?, ?, ?, ?, ?)
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
        SELECT id, service_title, description FROM services
    `,
    getServiceById: `
        SELECT * FROM services WHERE id = ?
    `,
    createService: `
        INSERT INTO services(id, service_title, description, created_at, updated_at)
        VALUES(?, ?, ?, ?, ?)
    `
};

module.exports = queries;
