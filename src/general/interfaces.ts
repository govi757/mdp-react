export default interface IPreLoad {
    filesApi: {
        writeFile: (src: string,content: any) => void;
        createFile: (src: string,fileName: string,content: any) => void;
        readFile: (src: string) => Promise<any>;
        openFolder: (res: (response: IOpenFolderResponse) => void) => void;
        readDir: (src: string,res: (response: string[]) => void) => void;
        // copyFolder:(dest: string) => void;
        // copyFrontEndFolder:(dest: string) => void;
    };
    notificationApi: {
        sendNotification: (message: string) => void
    }
}

export interface IOpenFolderResponse {
    filePaths: string[];
}



