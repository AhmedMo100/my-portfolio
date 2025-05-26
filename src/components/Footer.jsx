import React from 'react';

export default function Footer() {
    return (
        <footer id='footer' className="text-center py-3">
            <p>© {new Date().getFullYear()} My Portfolio. All rights reserved.</p>
        </footer>
    );
}
