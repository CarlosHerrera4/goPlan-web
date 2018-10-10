
export class Event {
    id?: string;
    name: string;
    description: string;

    public asFormData(): FormData {
        const data = new FormData();

        data.append('name', this.name);
        data.append('description', this.description)
        // data.append('content', this.content);

        // for (const tag of this.tags) {
        //     data.append('tags', tag);
        // }

        // for (const imageFile of this.imageFiles) {
        //     data.append('images', imageFile);
        // }

        return data;
    }
}