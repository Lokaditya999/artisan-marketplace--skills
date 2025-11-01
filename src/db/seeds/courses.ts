import { db } from '@/db';
import { courses } from '@/db/schema';

async function main() {
    const sampleCourses = [
        {
            title: 'Pottery Fundamentals',
            description: 'Learn the essential techniques of pottery making from scratch. Master hand-building, wheel throwing, and glazing basics. Perfect for beginners who want to create functional and decorative pottery pieces.',
            category: 'pottery',
            instructorId: 3,
            thumbnail: 'course_thumb1.jpg',
            price: 800,
            duration: '6 weeks',
            level: 'beginner',
            createdAt: new Date('2024-02-15').toISOString(),
        },
        {
            title: 'Advanced Ceramic Techniques',
            description: 'Explore professional ceramic techniques including advanced glazing, kiln firing methods, and sculptural ceramics. Students will develop their unique artistic style and create museum-quality pieces.',
            category: 'ceramic-products',
            instructorId: 7,
            thumbnail: 'course_thumb2.jpg',
            price: 2500,
            duration: '10 weeks',
            level: 'advanced',
            createdAt: new Date('2024-03-10').toISOString(),
        },
        {
            title: 'Traditional Weaving Mastery',
            description: 'Dive deep into traditional weaving techniques passed down through generations. Learn pattern creation, loom operation, and textile design. Complete complex projects including traditional textiles and contemporary woven art.',
            category: 'weaving',
            instructorId: 2,
            thumbnail: 'course_thumb3.jpg',
            price: 2800,
            duration: '12 weeks',
            level: 'advanced',
            createdAt: new Date('2024-01-20').toISOString(),
        },
        {
            title: 'Wooden Toy Crafting',
            description: 'Create safe, eco-friendly wooden toys using traditional carpentry methods. Learn wood selection, shaping, sanding, and non-toxic finishing techniques. Perfect for those wanting to craft heirloom-quality toys.',
            category: 'wooden-crafts',
            instructorId: 5,
            thumbnail: 'course_thumb4.jpg',
            price: 1200,
            duration: '8 weeks',
            level: 'intermediate',
            createdAt: new Date('2024-04-05').toISOString(),
        },
        {
            title: 'Jute Craft Essentials',
            description: 'Master the art of working with jute fiber to create sustainable products. Learn basic weaving, knotting, and finishing techniques for bags, baskets, and home decor items.',
            category: 'jute-crafts',
            instructorId: 9,
            thumbnail: 'course_thumb5.jpg',
            price: 600,
            duration: '4 weeks',
            level: 'beginner',
            createdAt: new Date('2024-05-12').toISOString(),
        },
        {
            title: 'Handloom Weaving Complete Course',
            description: 'Comprehensive training in handloom weaving from setup to finished textile. Understand warp and weft, pattern reading, and troubleshooting. Create your own handwoven fabrics for clothing and home furnishings.',
            category: 'weaving',
            instructorId: 1,
            thumbnail: 'course_thumb6.jpg',
            price: 1800,
            duration: '10 weeks',
            level: 'intermediate',
            createdAt: new Date('2024-03-25').toISOString(),
        },
        {
            title: 'Clay Sculpture for Beginners',
            description: 'Introduction to clay sculpture covering basic modeling techniques and form creation. Learn to work with different clay types and understand proportion, balance, and artistic expression in three dimensions.',
            category: 'pottery',
            instructorId: 4,
            thumbnail: 'course_thumb7.jpg',
            price: 700,
            duration: '6 weeks',
            level: 'beginner',
            createdAt: new Date('2024-02-28').toISOString(),
        },
        {
            title: 'Professional Pottery Workshop',
            description: 'Intensive workshop for aspiring professional potters covering production techniques, studio setup, and business basics. Master efficient throwing, batch glazing, and kiln management for commercial success.',
            category: 'ceramic-products',
            instructorId: 8,
            thumbnail: 'course_thumb8.jpg',
            price: 3000,
            duration: '12 weeks',
            level: 'advanced',
            createdAt: new Date('2024-01-08').toISOString(),
        },
        {
            title: 'Eco-friendly Craft Certification',
            description: 'Learn sustainable crafting practices using natural and recycled materials. Covers jute weaving, natural dyeing, and waste reduction techniques. Earn certification in eco-conscious craft production.',
            category: 'jute-crafts',
            instructorId: 6,
            thumbnail: 'course_thumb9.jpg',
            price: 1500,
            duration: '8 weeks',
            level: 'intermediate',
            createdAt: new Date('2024-04-18').toISOString(),
        },
        {
            title: 'Master Artisan Program',
            description: 'Comprehensive program covering multiple traditional crafts including woodworking, pottery, and weaving. Develop mastery-level skills and learn to preserve and innovate traditional techniques for modern markets.',
            category: 'wooden-crafts',
            instructorId: 10,
            thumbnail: 'course_thumb10.jpg',
            price: 500,
            duration: '4 weeks',
            level: 'beginner',
            createdAt: new Date('2024-06-01').toISOString(),
        },
    ];

    await db.insert(courses).values(sampleCourses);
    
    console.log('✅ Courses seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});