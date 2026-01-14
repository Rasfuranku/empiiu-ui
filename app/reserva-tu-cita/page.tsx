import Script from "next/script";

export default function ReservaCita() {
  // Replace this URL with your actual Google Script "Web App" URL
  const googleScriptUrl = "https://calendar.google.com/calendar/appointments/schedules/AcZssZ2kSfPaixMI805kk03OP3YZfhT7dwTvAL2qJIkZFtYD9oxfznKzhXERnnLmVGDijwa0ndaI-U06?gv=true";

  return (
    <>
    <Script id="meta-contact-tracking" strategy="afterInteractive">
        {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('track', 'Contact');
          `}
    </Script>
    <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderBottom: '1px solid #ddd' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Reserva tu Cita</h1>
      </header>

      <div style={{ flexGrow: 1, width: '100%', overflow: 'hidden' }}>
        <iframe
          src={googleScriptUrl}
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
          }}
          title="Google Calendar Reservation Script"
          allow="geolocation; microphone; camera"
        />
      </div>
    </div>
    </>
  );
}