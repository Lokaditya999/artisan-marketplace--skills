import { db } from '@/db';
import { artisans } from '@/db/schema';

async function main() {
    const sampleArtisans = [
        {
            name: 'Rajesh Kumar',
            bio: 'Master potter with over 30 years of experience in traditional Khurja pottery. Specializes in blue pottery and decorative ceramics.',
            story: 'Born into a family of potters, Rajesh learned the art from his father at age 12. He has dedicated his life to preserving the ancient techniques of Khurja pottery while innovating with contemporary designs. His work has been exhibited in galleries across India and internationally.',
            profileImage: 'artisan1.jpg',
            specialization: 'pottery',
            location: 'Khurja, Uttar Pradesh',
            createdAt: new Date('2022-03-15').toISOString(),
        },
        {
            name: 'Meera Devi',
            bio: 'Renowned ceramic artist known for her intricate terracotta sculptures and traditional temple decorations.',
            story: 'Meera comes from the famous Kumartuli artisan community where clay sculpture is a centuries-old tradition. She was one of the first women in her community to establish her own workshop. Her durga idols are sought after during festival seasons and her work continues to inspire younger generations.',
            profileImage: 'artisan2.jpg',
            specialization: 'ceramic',
            location: 'Kumartuli, West Bengal',
            createdAt: new Date('2022-06-20').toISOString(),
        },
        {
            name: 'Arjun Patel',
            bio: 'Fifth-generation weaver specializing in Pochampally ikat silk sarees with geometric patterns.',
            story: 'Growing up watching his grandmother weave on traditional looms, Arjun was captivated by the intricate process of ikat weaving. After formal training, he now runs a cooperative employing 20 local weavers. His mission is to keep the UNESCO-recognized Pochampally weaving tradition alive for future generations.',
            profileImage: 'artisan3.jpg',
            specialization: 'weaving',
            location: 'Pochampally, Telangana',
            createdAt: new Date('2022-09-10').toISOString(),
        },
        {
            name: 'Lakshmi Bai',
            bio: 'Expert woodcarver creating exquisite Channapatna toys using traditional lacquerware techniques.',
            story: 'Lakshmi learned the art of toy-making from her uncle who was a master craftsman. She specializes in creating eco-friendly wooden toys using vegetable dyes and traditional lac turnery. Her commitment to sustainable practices has earned her national recognition and her toys are exported worldwide.',
            profileImage: 'artisan4.jpg',
            specialization: 'woodwork',
            location: 'Channapatna, Karnataka',
            createdAt: new Date('2023-01-25').toISOString(),
        },
        {
            name: 'Vikram Singh',
            bio: 'Master potter creating stunning Rogan art-inspired ceramic pieces with intricate hand-painted designs.',
            story: 'Vikram inherited his passion for pottery from his grandfather who was a court artisan. He combines traditional Kutch pottery techniques with contemporary aesthetics. Despite challenges, he established a training center to teach young artisans the dying art of hand-painted ceramics.',
            profileImage: 'artisan5.jpg',
            specialization: 'pottery',
            location: 'Bhuj, Gujarat',
            createdAt: new Date('2023-03-12').toISOString(),
        },
        {
            name: 'Priya Sharma',
            bio: 'Skilled metalwork and ceramic artist specializing in brass inlay pottery and decorative home decor items.',
            story: 'Coming from Moradabad, the brass city of India, Priya innovatively merged metal craftsmanship with pottery. She learned ceramic techniques through a government artisan program and now creates unique pieces that blend both traditions. Her work has been featured in national design exhibitions.',
            profileImage: 'artisan6.jpg',
            specialization: 'ceramic',
            location: 'Moradabad, Uttar Pradesh',
            createdAt: new Date('2023-05-08').toISOString(),
        },
        {
            name: 'Ravi Verma',
            bio: 'Traditional Pattachitra artist transitioning into handwoven textiles with painted motifs.',
            story: 'Born in the heritage craft village of Raghurajpur, Ravi was trained in Pattachitra painting. He later ventured into weaving, incorporating his painting skills to create narrative textiles. His fusion of painting and weaving has created a unique style that celebrates Odisha\'s rich cultural heritage.',
            profileImage: 'artisan7.jpg',
            specialization: 'weaving',
            location: 'Raghurajpur, Odisha',
            createdAt: new Date('2023-07-19').toISOString(),
        },
        {
            name: 'Anjali Reddy',
            bio: 'Expert in traditional woodworking and furniture making with intricate carved details.',
            story: 'Anjali broke barriers in the male-dominated woodworking field in Kutch. After apprenticing with master carpenters, she now runs her own workshop creating traditional furniture with modern functionality. She mentors young women artisans and has become a role model in her community.',
            profileImage: 'artisan8.jpg',
            specialization: 'woodwork',
            location: 'Kutch, Gujarat',
            createdAt: new Date('2023-09-30').toISOString(),
        },
        {
            name: 'Kiran Rao',
            bio: 'Specialist in traditional jute weaving and eco-friendly handicrafts with contemporary designs.',
            story: 'Growing up in Kashmir\'s artisan community, Kiran learned jute weaving from local women\'s cooperatives. She pioneered modern designs in jute products, making them appealing to urban markets. Her sustainable approach and fair-trade practices have empowered dozens of women weavers in her village.',
            profileImage: 'artisan9.jpg',
            specialization: 'jute',
            location: 'Srinagar, Jammu & Kashmir',
            createdAt: new Date('2024-01-14').toISOString(),
        },
        {
            name: 'Deepak Joshi',
            bio: 'Master craftsman in jute and natural fiber weaving, creating traditional baskets and utility items.',
            story: 'Deepak comes from a long line of basket weavers in Rajasthan. He modernized traditional jute weaving techniques to create fashion accessories and home decor. His innovative products have found markets in metropolitan cities and he actively trains rural youth in sustainable craft entrepreneurship.',
            profileImage: 'artisan10.jpg',
            specialization: 'jute',
            location: 'Jaipur, Rajasthan',
            createdAt: new Date('2024-03-05').toISOString(),
        },
    ];

    await db.insert(artisans).values(sampleArtisans);
    
    console.log('✅ Artisans seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});