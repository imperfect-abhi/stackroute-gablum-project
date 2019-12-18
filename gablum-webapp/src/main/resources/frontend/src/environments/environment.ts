// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  wsURL: 'http://localhost:8080/api/auctions/ws',
  alertURL: 'http://localhost:8080/api/users/ws',
  loginApi: 'http://localhost:8080/api/users/signin',
  logoutApi: 'http://localhost:8080/api/users/signout',
  registerApi: 'http://localhost:8080/api/users/signup',
  contractsUrl: 'http://localhost:8080/api/contracts/contracts',
  profileUrl: 'http://localhost:8080/api/users/profile',
  proposalUrl: 'http://localhost:8080/api/proposals/proposals',
  navlinkUrl: 'http://localhost:8080/api/users/menuitems',
  guestProposallistUrl: 'http://localhost:8080/api/proposals/proposals/browse',
  inviteSellerUrl: 'http://localhost:8080/api/proposals/proposals/invite',
  saveSellerViewUrl: 'http://localhost:8080/api/proposals/proposals/views',
  auctionUrl: 'http://localhost:8080/api/auctions/auctions',
  tokenUrl: 'http://localhost:8080/api/auctions/tokens',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
