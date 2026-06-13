import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { urlConfig } from '../../config';

function MainPage() {
    const [gifts, setGifts] = useState([]);
    const navigate = useNavigate();

    const API_URL = urlConfig.backendUrl || urlConfig.baseUrl || urlConfig.apiUrl || 'http://localhost:3060';

    useEffect(() => {
        const fetchGifts = async () => {
            try {
                const response = await fetch(`${API_URL}/api/gifts`);

                if (!response.ok) {
                    throw new Error('Failed to fetch gifts');
                }

                const data = await response.json();
                setGifts(data);
            } catch (error) {
                console.error('Error fetching gifts:', error);
            }
        };

        fetchGifts();
    }, [API_URL]);

    const goToDetailsPage = (productId) => {
        navigate(`/details/${productId}`);
    };

    const formatDate = (timestamp) => {
        if (!timestamp) {
            return 'No date available';
        }

        const date = new Date(timestamp * 1000);
        return date.toLocaleDateString();
    };

    const getConditionClass = (condition) => {
        return condition === "New" ? "list-group-item-success" : "list-group-item-warning";
    };

    return (
        <div className="container mt-5">
            <div className="text-center mb-5">
                <h1 className="display-4">GiftLink</h1>
                <p className="lead">
                    Give items a second life by sharing household goods with people who need them.
                </p>
                <button
                    className="btn btn-primary btn-lg"
                    onClick={() => window.scrollTo({ top: 500, behavior: 'smooth' })}
                >
                    Get Started
                </button>
            </div>

            <div className="row">
                {gifts.map((gift) => (
                    <div key={gift.id} className="col-md-4 mb-4">
                        <div className="card product-card">
                            {gift.image ? (
                                <img
                                    src={gift.image}
                                    className="card-img-top"
                                    alt={gift.name}
                                />
                            ) : (
                                <div className="image-placeholder">
                                    No Image Available
                                </div>
                            )}

                            <div className="card-body">
                                <h5 className="card-title">{gift.name}</h5>

                                <p className="card-text">
                                    {gift.description}
                                </p>

                                <p className={`card-text ${getConditionClass(gift.condition)}`}>
                                    <strong>Condition:</strong> {gift.condition}
                                </p>

                                <p className="card-text">
                                    <strong>Category:</strong> {gift.category}
                                </p>

                                <p className="card-text">
                                    <strong>Date Added:</strong> {formatDate(gift.date_added)}
                                </p>

                                <button
                                    onClick={() => goToDetailsPage(gift.id)}
                                    className="btn btn-primary"
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MainPage;