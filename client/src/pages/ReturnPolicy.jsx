// import React from 'react';

// const ReturnPolicy = () => {
//     return (
//         <div className="px-4 mt-10 py-16 md:px-8 lg:px-16">
//             <h2 className="text-2xl font-bold mb-4 text-center underline">Return Policy</h2>

//             <h3 className="text-xl font-semibold mb-2">Returns & Replacements</h3>
//             <p className="mb-4 text-sm text-justify">
//                 To be eligible for a return, your item must be unused and in the same condition that you received it. For framed and unframed prints, replacements are only accepted if you receive a broken frame or glass or damaged print. It must also be in the original packaging along with the invoice/bill. Customers shall inform Dessine Art about the damaged artwork, quality issue, or wrong artwork within 48 hours of delivery along with photos of the artwork showing the issue as proof.
//             </p>
//             <p className="mb-4 text-sm text-justify">
//                 Dessine Art shall not be liable to replace the artwork or refund the money if Dessine Art is informed after completion of 48 hours from the time of delivery.
//             </p>

//             <h3 className="text-xl font-semibold mb-2 ">Additional non-returnable items:</h3>
//             <ul className="list-disc pl-6 mb-4 text-sm">
//                 <li>Gift cards</li>
//                 <li className='text-justify'>Some health and personal care items</li>
//             </ul>
//             <p className="mb-4 text-sm">
//                 To complete your return, we require a receipt or proof of purchase.
//             </p>

//             <h3 className="text-xl font-semibold mb-2 ">Partial Refunds (if applicable)</h3>
//             <p className="mb-4 text-sm text-justify">
//                 There are certain situations where only partial refunds are granted:
//             </p>
//             <ul className="list-disc pl-6 mb-4 text-sm">
//                 <li className='text-justify'>Any item not in its original condition, is damaged, or missing parts for reasons not due to our error.</li>
//                 <li className='text-justify'>Any item that is returned more than 7 days after delivery.</li>
//             </ul>
//             <p className="mb-4 text-sm text-justify">
//                 Note: Refunds are only accepted for original paintings. For COD orders, the COD fees charged while placing the order are not refunded.
//             </p>

//             <h3 className="text-xl font-semibold mb-2">Cancellation</h3>
//             <p className="mb-4 text-sm text-justify">
//                 Our artwork is customized as per your order. The production process starts as soon as you place the order. We are unable to cancel your order after the payment is made and you receive the confirmation. However, we are happy to cancel the order for you before our production process begins, which is typically within 2 hours of you placing an order. In case you wish to cancel, please call/write back to us as soon as possible, and we can let you know if the order can be canceled.
//             </p>
//             <p className="mb-4 text-sm text-justify">
//                 For Cancellation of Split COD Orders - The Partially paid amount i.e., 10% is non-refundable after 2 hours of placing the order.
//             </p>
//             <p className="mb-4 text-sm text-justify">
//                 Just in case, the reason behind the cancellation is that you like some other product on our website, then our team can definitely help you out with the replacement for the same. In this case, the team shall be informed within 24 hours of placing the order.
//             </p>

//             <h3 className="text-xl font-semibold mb-2 ">Refunds</h3>
//             <p className="mb-4 text-sm text-justify">
//                 Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund. If you are approved, then your refund will be processed, and a credit will automatically be applied to your credit card or original method of payment, within a certain amount of days.
//             </p>
//             <p className="mb-4 text-sm text-justify">
//                 Note: Refunds are just applicable on original artwork. And the artwork should be in original condition. Customized Framed artworks or Framed Prints are not eligible for refunds. They are only eligible for replacements. For Decorative Art Plates: We only offer replacements and no refunds on Art Plates as they are produced in limited batches and cannot be returned. Just in case you receive a damaged product or the wrong product, we offer a hassle-free replacement in that case.
//             </p>

//             <h3 className="text-xl font-semibold mb-2 ">Late or missing refunds</h3>
//             <p className="mb-4 text-sm text-justify">
//                 If you haven’t received a refund yet, first check your bank account again. Then contact your credit card company, it may take some time before your refund is officially posted. Next, contact your bank. There is often some processing time before a refund is posted. If you’ve done all of this and you still have not received your refund yet, please contact us at <a href="mailto:info@dessineart.com" className="text-blue-500">info@dessineart.com</a>.
//             </p>

//             <h3 className="text-xl font-semibold mb-2 ">Sale items</h3>
//             <p className="mb-4 text-sm text-justify">
//                 Only regular priced items may be refunded, unfortunately, sale items cannot be refunded.
//             </p>

//             <h3 className="text-xl font-semibold mb-2 ">Exchanges</h3>
//             <p className="mb-4 text-sm text-justify">
//                 We only replace frames, glass, and prints if they are defective or damaged. If you need to exchange it for the same item, send us an email at <a href="mailto:info@dessineart.com" className="text-blue-500">info@dessineart.com</a> and send your item to I-34/13, Ground Floor, Sailing Club, Lane-1, Okhla, New Delhi-110025, India.
//             </p>

//             <h3 className="text-xl font-semibold mb-2 ">Shipping</h3>
//             <p className="mb-4 text-sm text-justify">
//                 To return your product, you should mail your product to I-34/13, Ground Floor, Sailing Club, Lane-1, Okhla, New Delhi-110025, India. You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund. Depending on where you live, the time it may take for your exchanged product to reach you may vary. If you are shipping an item over $75, you should consider using a trackable shipping service or purchasing shipping insurance. We don’t guarantee that we will receive your returned item.
//             </p>
//         </div>
//     );
// }

// export default ReturnPolicy;


import React from 'react';
import { motion } from 'framer-motion';

// Define fade-in animation variants
const fadeInVariants = {
    hidden: { opacity: 0, y: 80 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } }
};

const ReturnPolicy = () => {
    return (
        <div className="px-4 mt-10 py-16 md:px-8 lg:px-16">
            <motion.h2 
                className="text-2xl font-bold mb-4 text-center underline"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInVariants}
            >
                Return Policy
            </motion.h2>

            <motion.h3 
                className="text-xl font-semibold mb-2"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInVariants}
            >
                Returns & Replacements
            </motion.h3>
            <motion.p 
                className="mb-4 text-sm text-justify"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInVariants}
            >
                To be eligible for a return, your item must be unused and in the same condition that you received it. For framed and unframed prints, replacements are only accepted if you receive a broken frame or glass or damaged print. It must also be in the original packaging along with the invoice/bill. Customers shall inform Dessine Art about the damaged artwork, quality issue, or wrong artwork within 48 hours of delivery along with photos of the artwork showing the issue as proof.
            </motion.p>
            <motion.p 
                className="mb-4 text-sm text-justify"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInVariants}
            >
                Dessine Art shall not be liable to replace the artwork or refund the money if Dessine Art is informed after completion of 48 hours from the time of delivery.
            </motion.p>

            <motion.h3 
                className="text-xl font-semibold mb-2"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInVariants}
            >
                Additional non-returnable items:
            </motion.h3>
            <motion.ul 
                className="list-disc pl-6 mb-4 text-sm"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInVariants}
            >
                <li>Gift cards</li>
                <li className='text-justify'>Some health and personal care items</li>
            </motion.ul>
            <motion.p 
                className="mb-4 text-sm"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInVariants}
            >
                To complete your return, we require a receipt or proof of purchase.
            </motion.p>

            <motion.h3 
                className="text-xl font-semibold mb-2"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInVariants}
            >
                Partial Refunds (if applicable)
            </motion.h3>
            <motion.p 
                className="mb-4 text-sm text-justify"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInVariants}
            >
                There are certain situations where only partial refunds are granted:
            </motion.p>
            <motion.ul 
                className="list-disc pl-6 mb-4 text-sm"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInVariants}
            >
                <li className='text-justify'>Any item not in its original condition, is damaged, or missing parts for reasons not due to our error.</li>
                <li className='text-justify'>Any item that is returned more than 7 days after delivery.</li>
            </motion.ul>
            <motion.p 
                className="mb-4 text-sm text-justify"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInVariants}
            >
                Note: Refunds are only accepted for original paintings. For COD orders, the COD fees charged while placing the order are not refunded.
            </motion.p>

            <motion.h3 
                className="text-xl font-semibold mb-2"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInVariants}
            >
                Cancellation
            </motion.h3>
            <motion.p 
                className="mb-4 text-sm text-justify"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInVariants}
            >
                Our artwork is customized as per your order. The production process starts as soon as you place the order. We are unable to cancel your order after the payment is made and you receive the confirmation. However, we are happy to cancel the order for you before our production process begins, which is typically within 2 hours of you placing an order. In case you wish to cancel, please call/write back to us as soon as possible, and we can let you know if the order can be canceled.
            </motion.p>
            <motion.p 
                className="mb-4 text-sm text-justify"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInVariants}
            >
                For Cancellation of Split COD Orders - The Partially paid amount i.e., 10% is non-refundable after 2 hours of placing the order.
            </motion.p>
            <motion.p 
                className="mb-4 text-sm text-justify"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInVariants}
            >
                Just in case, the reason behind the cancellation is that you like some other product on our website, then our team can definitely help you out with the replacement for the same. In this case, the team shall be informed within 24 hours of placing the order.
            </motion.p>

            <motion.h3 
                className="text-xl font-semibold mb-2"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInVariants}
            >
                Refunds
            </motion.h3>
            <motion.p 
                className="mb-4 text-sm text-justify"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInVariants}
            >
                Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund. If you are approved, then your refund will be processed, and a credit will automatically be applied to your credit card or original method of payment, within a certain amount of days.
            </motion.p>
            <motion.p 
                className="mb-4 text-sm text-justify"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInVariants}
            >
                Note: Refunds are just applicable on original artwork. And the artwork should be in original condition. Customized Framed artworks or Framed Prints are not eligible for refunds. They are only eligible for replacements. For Decorative Art Plates: We only offer replacements and no refunds on Art Plates as they are produced in limited batches and cannot be returned. Just in case you receive a damaged product or the wrong product, we offer a hassle-free replacement in that case.
            </motion.p>

            <motion.h3 
                className="text-xl font-semibold mb-2"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInVariants}
            >
                Late or missing refunds
            </motion.h3>
            <motion.p 
                className="mb-4 text-sm text-justify"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInVariants}
            >
                If you haven’t received a refund yet, first check your bank account again. Then contact your credit card company, it may take some time before your refund is officially posted. Next, contact your bank. There is often some processing time before a refund is posted. If you’ve done all of this and you still have not received your refund yet, please contact us at <a href="mailto:info@dessineart.com" className="text-blue-500">info@dessineart.com</a>.
            </motion.p>

            <motion.h3 
                className="text-xl font-semibold mb-2"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInVariants}
            >
                Sale items
            </motion.h3>
            <motion.p 
                className="mb-4 text-sm text-justify"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInVariants}
            >
                Only regular-priced items may be refunded. Sale items cannot be refunded.
            </motion.p>

            <motion.h3 
                className="text-xl font-semibold mb-2"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInVariants}
            >
                Exchanges
            </motion.h3>
            <motion.p 
                className="mb-4 text-sm text-justify"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInVariants}
            >
                We only replace items if they are defective or damaged. If you need to exchange it for the same item, send us an email at <a href="mailto:info@dessineart.com" className="text-blue-500">info@dessineart.com</a>.
            </motion.p>
            <motion.p 
                className="mb-4 text-sm text-justify"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInVariants}
            >
                Note: Exchanges are just applicable on original artwork. And the artwork should be in original condition. Customized Framed artworks or Framed Prints are not eligible for exchanges. They are only eligible for replacements. For Decorative Art Plates: We only offer replacements and no exchanges on Art Plates as they are produced in limited batches and cannot be returned. Just in case you receive a damaged product or the wrong product, we offer a hassle-free replacement in that case.
            </motion.p>

            <motion.h3 
                className="text-xl font-semibold mb-2"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInVariants}
            >
                Shipping
            </motion.h3>
            <motion.p 
                className="mb-4 text-sm text-justify"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInVariants}
            >
                To return your product, you should mail your product to: Plot no-45, F/F, KH no-143, Gali No. 20, Kaushik Enclave, Burari, North Delhi, Delhi-110084.
            </motion.p>
            <motion.p 
                className="mb-4 text-sm text-justify"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInVariants}
            >
                You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund.
            </motion.p>
            <motion.p 
                className="mb-4 text-sm text-justify"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInVariants}
            >
                Depending on where you live, the time it may take for your exchanged product to reach you may vary.
            </motion.p>
            <motion.p 
                className="mb-4 text-sm text-justify"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInVariants}
            >
                If you are shipping an item over INR 2000, you should consider using a trackable shipping service or purchasing shipping insurance. We don’t guarantee that we will receive your returned item.
            </motion.p>
        </div>
    );
}

export default ReturnPolicy;
