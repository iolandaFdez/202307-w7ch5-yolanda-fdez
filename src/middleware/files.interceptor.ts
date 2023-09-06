import createDebug from 'debug';
// Import multer, { } from "multer";

const debug = createDebug('W6E:Middleware:Files.Interceptor');

debug('Loaded fileInterceptor');


export class fileInterceptor {
    constructor() {
        debug('Instantiated fileInterceptor');
    };
};

// SingleFileStore(filename: string) {

//     const upload = multer ({ dest: 'uploads/'});

//     return upload.single(fileName)
// }

// function singleFileStore(filename: any, string: any) {
//     throw new Error('Function not implemented.');
// }
