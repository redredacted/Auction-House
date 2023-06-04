package main

import (
    "github.com/supertokens/supertokens-golang/recipe/session"
    "github.com/supertokens/supertokens-golang/recipe/thirdparty"
    "github.com/supertokens/supertokens-golang/recipe/thirdparty/tpmodels"
	"net/http"
    "strings"
	"github.com/supertokens/supertokens-golang/recipe/dashboard"
    "github.com/supertokens/supertokens-golang/supertokens"
)

func main() {
    apiBasePath := "/auth"
    websiteBasePath := "/auth"
    err := supertokens.Init(supertokens.TypeInput{
        Supertokens: &supertokens.ConnectionInfo{
            ConnectionURI: "https://dev-b7f32ce1025f11ee951e75c1653da6a1-us-east-1.aws.supertokens.io:3567",
            APIKey: "c=I6c72R17WbOM=MLQpa11lktJLmNU",
        },
        AppInfo: supertokens.AppInfo{
            AppName: "Auction House",
            APIDomain: "http://localhost:8080",
            WebsiteDomain: "http://localhost:5173",
            APIBasePath: &apiBasePath,
            WebsiteBasePath: &websiteBasePath,
        },
        RecipeList: []supertokens.Recipe{
            thirdparty.Init(&tpmodels.TypeInput{
				SignInAndUpFeature: tpmodels.TypeInputSignInAndUp{
					Providers: []tpmodels.TypeProvider{
						// We have provided you with development keys which you can use for testing.
						// IMPORTANT: Please replace them with your own OAuth keys for production use.
						// thirdparty.Google(tpmodels.GoogleConfig{
						// 	ClientID:     "1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com",
						// 	ClientSecret: "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",
						// }),
						thirdparty.Github(tpmodels.GithubConfig{
							ClientID:     "5b76c1d4b676446cca54",
							ClientSecret: "344ec07b7b89a3fe4f39ab9f0ccb39b772fa892d",
						}),
						// thirdparty.Apple(tpmodels.AppleConfig{
						// 	ClientID: "4398792-io.supertokens.example.service",
						// 	ClientSecret: tpmodels.AppleClientSecret{
						// 		KeyId:      "7M48Y4RYDL",
						// 		PrivateKey: "-----BEGIN PRIVATE KEY-----\nMIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgu8gXs+XYkqXD6Ala9Sf/iJXzhbwcoG5dMh1OonpdJUmgCgYIKoZIzj0DAQehRANCAASfrvlFbFCYqn3I2zeknYXLwtH30JuOKestDbSfZYxZNMqhF/OzdZFTV0zc5u5s3eN+oCWbnvl0hM+9IW0UlkdA\n-----END PRIVATE KEY-----",
						// 		TeamId:     "YWQCXGJRJL",
						// 	},
						// }),
						// thirdparty.Facebook(tpmodels.FacebookConfig{
						//    ClientID:     "FACEBOOK_CLIENT_ID",
						//    ClientSecret: "FACEBOOK_CLIENT_SECRET",
						// }),
					},
				},
			}),
            session.Init(nil), // initializes session features
			dashboard.Init(nil), // initializes dashboard features
        },
    })

    if err != nil {
        panic(err.Error())
    }

    http.ListenAndServe("0.0.0.0:8080", corsMiddleware(
        supertokens.Middleware(http.HandlerFunc(func(rw http.ResponseWriter,
        r *http.Request) {
            // TODO: Handle your APIs..
			http.Error(rw, "Not implemented", http.StatusNotImplemented)
        }))))
}

func corsMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(response http.ResponseWriter, r *http.Request) {
        response.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
        response.Header().Set("Access-Control-Allow-Credentials", "true")
        if r.Method == "OPTIONS" {
            // we add content-type + other headers used by SuperTokens
            response.Header().Set("Access-Control-Allow-Headers",
                strings.Join(append([]string{"Content-Type"},
                    supertokens.GetAllCORSHeaders()...), ","))
            response.Header().Set("Access-Control-Allow-Methods", "*")
            response.Write([]byte(""))
        } else {
            next.ServeHTTP(response, r)
        }
    })
}