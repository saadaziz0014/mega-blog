import upload from '../services/upload'
import { useNavigate } from 'react-router-dom'

export default function BogCard({ title, description, slug, image, userID }) {
    const url = upload.getPreview(image)
    const navigate = useNavigate()
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img src={url} alt={slug} /></figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>{description}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary" onClick={() => navigate(`/blog/${slug}`)}>Read More</button>
                </div>
            </div>
        </div>
    )
}