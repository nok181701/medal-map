import Footer from "src/components/Footer";
import Header from "src/components/Header";

const PrivacyPolicy = () => {
  return (
    <>
      <Header />
      <div className="bg-contentsBg p-8">
        <h1 className="text-3xl font-bold mb-4">プライバシーポリシー</h1>
        <hr className="mb-3" />
        <article className="text-lg">
          <p className="text-sm mb-3">
            メダルマップ（以下、「当方」といいます。）は，本ウェブサイト上で提供するサービス（以下、「本サービス」といいます。）における、お客様の個人情報の取扱いについて，以下のとおりプライバシーポリシーを定めます。
          </p>
          <h2 className="text-xl font-semibold mt-2">お客様から取得する情報</h2>
          <ul className="list-disc ml-2">
            <li className="text-sm mb-2">お客様の位置情報</li>
          </ul>
          <h2 className="text-xl font-bold mb-2">お客様の情報を利用する目的</h2>
          <ul className="list-disc ml-2">
            <li className="text-sm">
              本サービスに関する登録の受付、お客様の本人確認、認証のため
            </li>
            <li className="text-sm">
              お役様の本サービスの利用履歴を管理するため
            </li>
            <li className="text-sm">
              本サービスにおけるお客様の行動履歴を分析し、本サービスの維持改善に役立てるため
            </li>
            <li className="text-sm">本サービスに関するご案内をするため</li>
            <li className="text-sm">お客様からの問い合わせに対応するため</li>
            <li className="text-sm">
              当方の規約や法令に違反する行為に対応するため
            </li>
            <li className="text-sm">
              本サービスの変更、提供中止、終了、契約解除をご連絡するため
            </li>
            <li className="text-sm">当方規約の変更等を通知するため</li>
            <li className="text-sm mb-2">
              以下の他、本サービスの提供、維持、保護及び改善のため
            </li>
          </ul>
          <h2 className="text-xl font-bold mb-2">第三者提供</h2>
          <p className="text-sm mb-2">
            当方は、お客様から取得する情報のうち、個人データ（個人情報保護法第１６条第３項）に該当するものについては、あらかじめお客様からの同意を得ずに、第三者（日本国外にある者を含みます。）に提供しません。
          </p>
          <ol className="list-decimal ml-6 mb-4">
            <li className="text-sm ">
              但し、次の場合は除きます。個人データの取り扱いを外部に委託する場合
            </li>
            <li className="text-sm">当方や本サービスが買収された場合</li>
            <li className="text-sm">
              事業パートナーと共同利用する場合（具体的な共同利用がある場合は、その内容を別途公表します。）
            </li>
            <li className="text-sm">
              その他、法律によって合法的に第三者提供が許されている場合
            </li>
          </ol>

          <h2 className="text-xl font-bold mb-2">プライバシーポリシーの変更</h2>
          <p className="text-sm mb-2">
            当方は、必要に応じて、このプライバシーポリシーの内容を変更します。この場合、変更後のプライバシーポリシーの施行時期と内容を適切な方法により周知または通知します。
          </p>
          <h2 className="text-xl font-semibold mt-4">お問い合わせ</h2>
          <p className="text-sm mb-2">
            お客様の情報の開示、情報の訂正、利用停止、削除をご希望の方は、以下のメールアドレスにご連絡ください。
          </p>
          <p className="text-sm mb-2">nok181701@gmail.com</p>
          <p className="text-sm mb-2">
            この場合、必ず、運転免許証のご提示等当方が指定する方法により、ご本人からのご請求であることの確認をさせていただきます。なお、情報の開示請求については、開示の有無に関わらず、ご申請時に一件当たり1,000円の事務手数料を申し受けます。
          </p>
          <h2 className="text-xl font-bold mb-2">事業者の氏名</h2>
          <p className="text-sm mb-2">祝井直樹</p>
          <p className="mt-4">2024年1月21日 制定</p>
        </article>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
