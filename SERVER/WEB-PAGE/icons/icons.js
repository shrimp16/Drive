const TEXT = './icons/text.png';
const RAR = './icons/rar.png';
const WORD = './icons/word.png';
const PDF = './icons/pdf.png';

export function setIcon(type) {
    switch (type) {
        case 'text/plain':
            return TEXT;
        case 'application/zip':
            return RAR;
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            return WORD;
        case 'application/pdf':
            return PDF;
    }
}