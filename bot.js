// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

var axios = require('axios')

const { ActivityTypes } = require('botbuilder');

class MyBot {
    /**
     *
     * @param {TurnContext} on turn context object.
     */
    async onTurn(turnContext) {

        function findByName(data, name)
        {
            var id = 1
    
            for(i = 0; i < data.length; i ++)
            {
                if(data[i].name.includes(name))
                    id = data[i].id
            }
    
            return id
        }

        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
        var data

        var url = "https://261ad154.ngrok.io/api/politician/"
            const api = axios.create({
                baseURL: url,
                });
                api.defaults.headers.common['Content-Type'] = "application/json";
                api.get().then(function (response) {
                    // handle success
                    console.log(response)
                    data = response
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .then(function () {
                    // always executed
            });

        if (turnContext.activity.type === ActivityTypes.Message) {
            var text = turnContext.activity.text    
            var id = findByName(data.data, text)
            await turnContext.sendActivity(`You said '${ id }'`);
        } else {
            await turnContext.sendActivity(`[${ turnContext.activity.type } event detected]`);
        }
    }
}

module.exports.MyBot = MyBot;
