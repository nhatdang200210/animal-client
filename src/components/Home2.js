import React from 'react'
import '../css/Home.css'
import { Link } from 'react-router-dom'

export default function Home2() {
  return (
<section className="container-h">
    <div className="home2-bg">
        <h5 className="home-h5">Hi,</h5>
        <h5 className="home-h5">Chào mừng các bạn đến với blog của animal.</h5>
    </div>
    <div className="h-gt">
        <h1 className="gt-h1">Giới thiệu</h1>
    </div>
    <div>
        <form className="gt-text">
            <p>Hi các bạn,</p>
            <p>Đây là một blog dành cho bất kỳ ai yêu quý động vật.</p>

            <p>Hiện nay số lượng các loài động vật hoang dã (ĐVHD) của Việt Nam đang ngày càng suy giảm một cách nghiêm trọng. Có đến 745 loài nguy cấp đang bị đe dọa tại Việt Nam, trong đó có “64 loài thú, 53 loài chim, 70 loài bò sát, 45 loài lưỡng cư, và 96 loài cá” (Theo Tổ chức Bảo tồn Thiên nhiên Quốc tế – IUCN, 2020, trích dẫn từ báo VietnamPlus, 2021). Bên cạnh đó, rất nhiều loài đã rơi vào tình trạng cực kỳ nguy cấp, có nguy cơ bị tuyệt chủng rất cao ngoài tự nhiên như Hổ, Báo, Gấu, Voi, hay một số các loài Linh trưởng và nhiều loài khác; thậm chí có những loài thực sự đã vĩnh viễn biến mất trên bản đồ phân bố động vật Việt Nam như Tê giác một sừng (Javan rhinoceros) (Theo WWF và IRF, 2011). Nguyên nhân gốc rễ của vấn đề là do sự thiếu thông tin cũng như thái độ thờ ơ đối với động vật hoang dã của một bộ phận người trong xã hội, từ đó đã dẫn tới những hành động và ứng xử không thân thiện gây hại tới động vật hoang dã.</p>

            <p style={{fontSize:"20px", fontWeight:"bold"}}>Hãy nói không với Thí nghiệm trên động vật</p>

            <p>Thí nghiệm trên động vật là một trong những việc làm gây phản đối và nhiều tranh cãi. Với bất kì lí do gì thì việc sử dụng tính mạng của bất kì loài nào nhằm vào việc đạt được mục đích nghiên cứu, thương mại là vô cùng tàn nhẫn. </p>

            <p style={{fontSize:"20px", fontWeight:"bold"}}>Bảo vệ động vật hoang dã là bảo vệ sự sống của con người</p>

            <p>Trong cách nói "rừng vàng biển bạc", Bác Hồ từng nhấn mạnh nhiệm vụ bảo vệ rừng, giữ gìn tài nguyên thiên nhiên quý giá cho thế hệ sau. Người nói: "Ta thường nói "rừng vàng biển bạc". Rừng là vàng, nếu mình biết bảo vệ, xây dựng thì rừng rất quý" (Bài nói tại Hội nghị Tuyên giáo miền núi, ngày 31/8/1963).</p>

            <p>Thế nên, với tất cả can đảm vốn có, mình lập nên ngôi nhà nhỏ này để viết và chia sẻ những điều mình luôn muốn tỏ bày. Cảm ơn bạn đã lựa chọn lắng nghe những câu chuyện nhỏ của mình. Cảm ơn gấp bội nếu bạn thấy bản thân trong đó. Và xin bạn đừng quên, mình cũng muốn nghe chia sẽ của bạn. Gửi confession cho mình tại đường link này: 
            <Link to = '/status'>Share_Confession_with_Nhat.dang</Link></p>

            <p>Nếu ưa thích những bài viết của mình, ghé đọc thêm những bài viết khác trên trang fanpage này bạn nhé.</p>
        </form>
    </div>
</section>
  )
}
