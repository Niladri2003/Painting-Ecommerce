import React from 'react';

const Sidebar = () => {
    return (
        <div className="sidebar bg-gray-200 p-4">
            <h2 className="text-xl font-semibold">Categories</h2>
            {/* Add your filter options or categories here */}
            <ul>
                <li>Modern Art</li>
                <li>Abstract</li>
                <li>Vintage</li>
                {/* Map over categories from API if needed */}
            </ul>
        </div>
    );
};

export default Sidebar;
