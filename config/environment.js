

const development = {
    name: 'development',
    asset_path: '/assets',
    session_cookie_key: 'nikhilpounikar',
    db: 'major_project_1_development',
    smtp: {
        // service: 'gmail',
         host: 'smtp-relay.brevo.com',
         port: 587,
         secure: false,
         auth: {
             user: 'nikhilptacktile@gmail.com',
             pass: '0kY8VD1yHP4XvITM'
         }
     },
    google_client_id: "977932929073-fpud2qtp5eb1o7onjs78qomj00sk4rag.apps.googleusercontent.com",
    google_client_secret: "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",
    google_call_back_url: "http://localhost:8000/user/auth/google/callback",
    jwt_secret: 'secret',
}


const production =  {
    name: 'production'
}



module.exports = development;