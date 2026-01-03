function getPageNumbers(current: number, total: number) {
    const pages: (number | '...')[] = [];

    pages.push(1); // first page

    if (current > 4) pages.push('...');

    for (let i = current - 2; i <= current + 2; i++) {
        if (i > 1 && i < total) pages.push(i);
    }

    if (current + 2 < total - 1) pages.push('...');

    if (total > 1) pages.push(total); // last page

    return pages;
}

export default getPageNumbers;
