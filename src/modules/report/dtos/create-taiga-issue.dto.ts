export interface CreateTaigaIssueDTO {
    description: string,
    project: number,
    subject: string,
    tags: Array<string>,
}
