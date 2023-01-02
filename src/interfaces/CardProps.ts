interface UserInferface {
    name: string; 
    link: string;
    profile: string;
}
export default interface CardProps {
    title: string;
    description?: string;
    image: string;
    author: UserInferface;
    coauthors?: UserInferface[];
    date: string;
    url: string;
}