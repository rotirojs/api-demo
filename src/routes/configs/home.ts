import { ApiRequest, RouteConfig } from 'rotiro';

export const homeConfig: RouteConfig = {
  methods: {
    GET: {
      controller: getController
    }
  }
};

async function getController(apiRequest: ApiRequest): Promise<void> {
  apiRequest.send(
    `
            <html lang="en-GB">
              <body>
                <h1>Home</h1>
                <p>This endpoint is not part of the api, although it demonstrates how to return html</p>
              </body>
            </html>`
  );
}
